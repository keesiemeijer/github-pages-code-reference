<?php
global $wp_parser_json_html, $wp_parser_json_types, $wp_parser_json_package;

include 'settings.php';

add_filter( 'wp_parser_json_skip_deprecated', '__return_false' );

add_action( 'wp_enqueue_scripts', 'wporg_developer_child_enqueue_styles' );

function wporg_developer_child_enqueue_styles() {
	wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
}

add_filter( 'wp_parser_json_parse_post_types', 'wporg_developer_child_parse_post_types' );

function wporg_developer_child_parse_post_types() {
	return wporg_developer_child_get_post_types_to_parse();
}


add_filter( 'wp_parser_json_content_item', 'wporg_developer_child_get_plugin_data', 10, 2 );

function wporg_developer_child_get_plugin_data( $item, $post_item ) {
	global $wp_parser_json_html, $wp_parser_json_types, $post;

	add_filter( 'the_permalink', 'wporg_developer_child_update_site_permalink', 101 );
	add_filter( 'post_link', 'wporg_developer_child_update_site_permalink', 101 );
	add_filter( 'post_type_link', 'wporg_developer_child_update_site_permalink', 101 );

	$post = $post_item;

	$first_version = '';
	$versions = \DevHub\get_changelog_data( $post_item->ID );

	foreach ( $versions as $version ) {
		if ( ! $first_version ) {
			$first_version = $version['version'];
			continue;
		}

		if ( version_compare( $version['version'], $first_version, '<' ) ) {
			$first_version = $version['version'];
		}
	}
	$description = \DevHub\get_description( $post );

	$item['since']       = $first_version;
	$item['description'] = $description ? $description : '';
	$item['deprecated']  = \DevHub\is_deprecated( $post_item->ID );
	$item['summary']     = \DevHub\get_summary( $post_item );
	$item['signature']   = \DevHub\get_signature( $post_item->ID );
	$item['source_file'] = \DevHub\get_source_file( $post_item->ID );
	$item['line_num'] = get_post_meta( $post_item->ID, '_wp-parser_line_num', true );
	$item['source']      = sprintf( __( 'Source: %s', 'wporg-developer-child' ), $item['source_file'] );


	$json_file = str_replace( '/', '-', $item['source_file'] );
	if ( substr( $json_file, -4 ) == '.php' ) {
		// Then remove the last .php from the string
		$json_file = substr( $json_file, 0, -4 );
	}

	$item['json_file'] = $json_file;

	$templates = array(
		'description',
		'params',
		'return',
		'changelog',
		'methods',
		'related',
	);

	$html = '';
	foreach ( $templates as $part ) {
		$html .= wporg_developer_child_get_template( $part, $post_item );
	}

	$post_types =  array(
		'wp-parser-class'    => 'classes',
		'wp-parser-function' => 'functions',
		'wp-parser-hook'     => 'hooks',
		'wp-parser-method'   => 'methods',
	);

	$wp_parser_json_html = is_array( $wp_parser_json_html ) ? $wp_parser_json_html : array();
	$wp_parser_json_types = is_array( $wp_parser_json_types ) ? $wp_parser_json_types : array();


	$slug = $item['slug'];
	if ( $post_item->post_parent && ( 'wp-parser-method' === $post_item->post_type ) ) {
		$parent = get_post( $post_item->post_parent );

		$item['slug'] = $parent->post_name . '::' . $item['slug'];
		$item['parent'] = $parent->post_name;
	}

	$wp_parser_json_html[ $item['json_file'] ][ $item['slug'] ] = $html;

	$wp_parser_json_types[ $post_types[ $post_item->post_type ] ][] = $slug;

	remove_filter( 'the_permalink', 'wporg_developer_child_update_site_permalink', 101 );
	remove_filter( 'post_link', 'wporg_developer_child_update_site_permalink', 101 );
	remove_filter( 'post_type_link', 'wporg_developer_child_update_site_permalink', 101 );
	wp_reset_postdata();

	return $item;
}

add_action( 'shutdown', 'wporg_developer_child_shutdown' );

function wporg_developer_child_shutdown() {
	wporg_developer_child_generate_files();
}

function wporg_developer_child_update_site_permalink( $permalink ) {
	global $wp_parser_json_package;

	if ( ! is_array( $wp_parser_json_package ) ) {
		$wp_parser_json_package = wporg_developer_child_get_package();
	}

	$has_homepage = isset( $wp_parser_json_package['homepage'] );

	if ( ! ( $has_homepage && $wp_parser_json_package['homepage'] ) ) {
		return $permalink;
	}

	$homepage = $wp_parser_json_package['homepage'];

	$method = site_url( '/method/' );

	$permalink = str_replace( $method, trailingslashit( $homepage ) . 'classes/', $permalink );

	$url = site_url( '/reference/' );
	$permalink = str_replace( $url, trailingslashit( $homepage ), $permalink );
	return $permalink;
}

function wporg_developer_child_get_template( $template, $post_item ) {
	global $post;
	$post = $post_item;
	ob_start();
	get_template_part( 'reference/template', $template );
	$template = ob_get_clean();
	wp_reset_postdata();
	return $template;
}

function wporg_developer_child_get_home_template() {
	$strings = wporg_developer_child_get_localized_strings();

	//'homepage'       => '',
	$defaults = array(
		'app_basename'      => '',
		'app_url'           => '',
		'repo_url'          => '',
		'parsed_branch_url' => '',
		'parsed_name'       => '',
		'parsed_version'    => '',
		'parsed_type'       => '',
	);


	$package = wporg_developer_child_get_package();
	$package['reference'] = array_merge( $defaults, $package['reference'] );
	if ( isset( $package['homepage'] ) ) {
		$package['reference']['homepage'] = $package['homepage'];
	}
	$package = $package['reference'];

	echo '<pre>';
	print_r( $package );
	echo '</pre>';

	ob_start();
	include 'reference/template-home.php';
	$content = ob_get_clean();

	$js = <<<EOT
import React from 'react';

const HomeContent = props => {
	return (
		<div>
		{$content}
		</div>
	)
}

export default HomeContent;
EOT;

	return $js;
}

function wporg_developer_child_get_package() {
	global $wp_parser_json_package;

	if ( is_array( $wp_parser_json_package ) ) {
		return $wp_parser_json_package;
	}

	$package_file = get_stylesheet_directory() . '/package.json';

	if ( ! is_readable( $package_file ) ) {
		return array();
	}

	$package = file_get_contents( $package_file );
	$package_json = json_decode( $package, true );

	return is_array( $package_json ) ? $package_json : array();
}

function wporg_developer_child_copy_dir( $old, $new ) {
	global $wp_filesystem;

	$dirlist = $wp_filesystem->dirlist( $old );

	foreach ( $dirlist as $dir ) {
		if ( 'd' === $dir['type'] ) {
			if ( $wp_filesystem->exists( $new . '/' . $dir['name'] ) ) {
				continue;
			}

			if ( ! $wp_filesystem->mkdir( $new['name'] ) ) {
				$error = esc_html__( "Unable to create the directory {$new['name']}"  , 'wporg-developer-child' );
				add_settings_error( 'wporg-developer-child', 'create_directory', $error, 'error' );
				return false;
			}

			wporg_developer_child_copy_dir( $old . '/' . $dir['name'], $new . '/' . $dir['name'] );
		}

		if ( 'f' === $dir['type'] ) {
			if ( ! $wp_filesystem->move( $old . '/' . $dir['name'], $new . '/' . $dir['name'] ) ) {
				$error = esc_html__( "Unable to copy file {$new['name']}"  , 'wporg-developer-child' );
				add_settings_error( 'wporg-developer-child', 'create_directory', $error, 'error' );
				return false;
			}
		}
	}

	return true;
}

function wporg_developer_child_generate_files() {
	global $wp_parser_json_html, $wp_parser_json_types;
	if ( ! is_array( $wp_parser_json_html ) || empty( $wp_parser_json_html ) ) {
		return;
	}

	if ( ! ( defined( 'WP_PARSER_JSON_DIR' ) && WP_PARSER_JSON_DIR ) ) {
		return;
	}

	if ( 'POST' != $_SERVER['REQUEST_METHOD'] ) {
		return false;
	}

	check_admin_referer( 'wp-parser-json_nonce' );


	// remove the magic quotes
	$_POST = stripslashes_deep( $_POST );

	if ( ! ( isset( $_POST['submit'] ) && ( 'Generate json files!' === $_POST['submit'] ) ) ) {
		return false;
	}

	// Okay, let's see about getting credentials.
	$form_fields = array();
	$method = ''; // TODO TESTING
	$theme_dir = get_stylesheet_directory() . '/src';

	$url = wp_nonce_url( 'options-general.php?page=wp-parser-json', 'wp-parser-json_nonce' );
	if ( false === ( $creds = request_filesystem_credentials( $url, $method, false, false, $form_fields ) ) ) {
		return true;
	}

	// Now we have some credentials, try to get the wp_filesystem running.
	if ( ! WP_Filesystem( $creds ) ) {
		// Our credentials were no good, ask the user for them again.
		request_filesystem_credentials( $url, $method, true, false, $form_fields );
		return true;
	}

	global $wp_filesystem;

	// Check if files were created
	if ( ! $wp_filesystem->exists( WP_PARSER_JSON_DIR . '/json-files' ) ) {
		$error = esc_html__( "Could not find json-files directory", 'wporg-developer-child' );
		add_settings_error( 'wporg-developer-child', 'delete_directory', $error, 'error' );
		return false;
	}

	// Delete theme directory (and files) if it exists.
	if ( $wp_filesystem->exists( $theme_dir . '/json-files' ) ) {
		if ( ! $wp_filesystem->rmdir( $theme_dir . '/json-files', true ) ) {
			$error = esc_html__( "Unable to delete directory $dir", 'wporg-developer-child' );
			add_settings_error( 'wporg-developer-child', 'delete_directory', $error, 'error' );
			return false;
		}
	}

	// Create json-files directory
	if ( ! $wp_filesystem->mkdir( $theme_dir . '/json-files' ) ) {
		$error = esc_html__( "Unable to create directory"  , 'wporg-developer-child' );
		add_settings_error( 'wporg-developer-child', 'create_directory', $error, 'error' );
		return false;
	}

	// Create html directory
	if ( ! $wp_filesystem->mkdir( $theme_dir . '/json-files/html' ) ) {
		$error = esc_html__( "Unable to create directory"  , 'wporg-developer-child' );
		add_settings_error( 'wporg-developer-child', 'create_directory', $error, 'error' );
		return false;
	}

	// Copy the json-files directory from the wp-parser-json directory
	$copy = wporg_developer_child_copy_dir( WP_PARSER_JSON_DIR . '/json-files', $theme_dir . '/json-files' );
	if ( ! $copy ) {
		$error = esc_html__( "Unable to copy files"  , 'wporg-developer-child' );
		add_settings_error( 'wporg-developer-child', 'create_directory', $error, 'error' );
		return false;

	}

	// Create the html files.
	foreach ( $wp_parser_json_html as $slug => $content ) {
		$file = $theme_dir . '/json-files/html/' . $slug . '.json';
		$content = json_encode( $content );
		if ( ! $wp_filesystem->put_contents( $file, $content, FS_CHMOD_FILE ) ) {
			$error = esc_html__( "Unable to create the file: {$slug}.json", 'wporg-developer-child' );
			add_settings_error( 'wporg-developer-child', 'create_file', $error, 'error' );
			return false;
		}
	}

	$file =  $theme_dir . '/templates/home-content.jsx';
	$content = wporg_developer_child_get_home_template();

	// Create the home content file
	if ( ! $wp_filesystem->put_contents( $file, $content, FS_CHMOD_FILE ) ) {
		$error = esc_html__( "Unable to create the file: {$file}", 'wporg-developer-child' );
		add_settings_error( 'wporg-developer-child', 'create_file', $error, 'error' );
		return false;
	}

	$file = $theme_dir . '/json-files/wp-parser-json-strings.json';
	$content = json_encode( wporg_developer_child_get_localized_strings() );

	// Create the strings file
	if ( ! $wp_filesystem->put_contents( $file, $content, FS_CHMOD_FILE ) ) {
		$error = esc_html__( "Unable to create the file: {$file}", 'wporg-developer-child' );
		add_settings_error( 'wporg-developer-child', 'create_file', $error, 'error' );
		return false;
	}

	return false;
}
