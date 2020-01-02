<?php
global $wp_parser_json, $wp_parser_json_types, $wp_parser_json_terms;

include 'settings.php';
include 'related.php';
include 'changelog.php';
include 'methods.php';

add_filter( 'wp_parser_json_skip_deprecated', '__return_false' );

add_action( 'wp_enqueue_scripts', 'wporg_developer_child_enqueue_styles' );

function wporg_developer_child_enqueue_styles() {
	wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
}

add_filter( 'wp_parser_json_parse_post_types', 'wporg_developer_child_parse_post_types' );

function wporg_developer_child_parse_post_types() {
	return wporg_developer_child_get_post_types_to_parse();
}

add_action( 'init', 'wporg_developer_child_init_prority_10' );

function wporg_developer_child_init_prority_10() {
	global $wp_parser;

	if ( $wp_parser instanceof \WP_Parser\Plugin ) {
		// Parser is activated. Remove WP Parser methods permalink filter.
		remove_filter( 'post_type_link', array( $wp_parser, 'method_permalink' ), 10, 2 );
	}
}

add_action( 'shutdown', 'wporg_developer_child_shutdown' );

function wporg_developer_child_shutdown() {
	wporg_developer_child_generate_files();
}

add_filter( 'wp_parser_json_content_item', 'wporg_developer_child_get_plugin_data', 10, 2 );

function wporg_developer_child_get_plugin_data( $item, $post_item ) {
	global $wp_parser_json, $wp_parser_json_types, $wp_parser_json_terms, $post;

	add_filter( 'the_permalink', 'wporg_developer_child_update_site_permalink', 101 );
	add_filter( 'post_link', 'wporg_developer_child_update_site_permalink', 101 );
	add_filter( 'post_type_link', 'wporg_developer_child_update_site_permalink', 101 );
	add_filter( 'post_type_archive_link', 'wporg_developer_child_update_site_permalink', 101 );

	remove_filter( 'the_title',         'wporg_filter_archive_title', 10, 2 );
	remove_filter( 'single_post_title', 'wporg_filter_archive_title', 10, 2 );

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

	$since_meta = get_post_meta( $post_item->ID, '_wp-parser_tags', true );

	$since_tags    = wp_filter_object_list( $since_meta, array( 'name' => 'since' ) );

	$introduced    = array_shift( $since_tags );
	$is_introduced = isset( $introduced['content'] ) && trim( $introduced['content'] );
	$introduced    = $is_introduced ? trim( $introduced['content'] ) : false;

	$deprecated    = wp_filter_object_list( $since_meta, array( 'name' => 'deprecated' ) );
	$deprecated    = array_shift( $deprecated );
	$is_deprecated = isset( $deprecated['content'] ) && trim( $deprecated['content'] );
	$deprecated    = $is_deprecated ? trim( $deprecated['content'] ) : false;

	$terms         = wp_get_post_terms( $post_item->ID, 'wp-parser-since', array( 'fields' => 'names' ) );

	if ( $is_deprecated && ! is_wp_error( $terms ) && ! in_array( $deprecated, $terms ) ) {
		$terms[] = $deprecated;
	}

	if( ! is_wp_error( $terms ) && empty( $terms ) ) {
		$terms[] = 'undocumented';
	}

	//$item['post_type']   = $post_item->post_type;
	$item['introduced']  = $introduced;
	$item['deprecated']  = $deprecated;
	$item['terms']       = $terms;
	$item['source_file'] = \DevHub\get_source_file( $post_item->ID );
	$item['line_num']    = get_post_meta( $post_item->ID, '_wp-parser_line_num', true );
	$item['namespace']   = get_post_meta( $post_item->ID, '_wp_parser_namespace', true );
	$item['aliases']     = get_post_meta( $post_item->ID, '_wp_parser_aliases', true );
	$item['source']      = sprintf( __( 'Source: %s', 'wporg-developer-child' ), $item['source_file'] );
	$item['summary']     = sanitize_html( \DevHub\get_summary( $post_item ) );

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
	);

	$html = '';
	foreach ( $templates as $part ) {
		$html .= wporg_developer_child_get_template( $part, $post_item );
	}

	$post_types = wporg_developer_child_get_post_types();
	$post_type = $post_types[ $post_item->post_type ];

	$wp_parser_json       = is_array( $wp_parser_json ) ? $wp_parser_json : array();
	$wp_parser_json_types = is_array( $wp_parser_json_types ) ? $wp_parser_json_types : array();
	$wp_parser_json_terms = is_array( $wp_parser_json_terms ) ? $wp_parser_json_terms : array();

	if ( isset( $wp_parser_json_terms[ $post_type ] ) ) {
		$wp_parser_json_terms[ $post_type ] = array_merge( $wp_parser_json_terms[ $post_type ], $terms );
	} else {
		$wp_parser_json_terms[ $post_type ] = $terms;
	}

	foreach ( $wp_parser_json_terms as $key => $value ) {
		sort( $value );
		$wp_parser_json_terms[ $key ] = array_reverse( array_unique( $value ) );
	}

	$slug = $item['slug'];
	if ( $post_item->post_parent && ( 'wp-parser-method' === $post_item->post_type ) ) {
		$parent = get_post( $post_item->post_parent );

		$item['slug'] = $parent->post_name . '::' . $item['slug'];
		$item['parent'] = $parent->post_title;
	}

	$JSON_key = $item['slug'] . '-' . $item['line_num'];
	$notice   = $is_deprecated ? \DevHub\get_deprecated( $post_item->ID ) : '';

	$wp_parser_json[ $item['json_file'] ][ $JSON_key ]['html']      = sanitize_html( $html );
	$wp_parser_json[ $item['json_file'] ][ $JSON_key ]['methods']   = \DevHub\get_method_items();
	$wp_parser_json[ $item['json_file'] ][ $JSON_key ]['related']   = \DevHub\get_related_items();
	$wp_parser_json[ $item['json_file'] ][ $JSON_key ]['changelog'] = \DevHub\get_changelog_items( $post_item->ID );
	$wp_parser_json[ $item['json_file'] ][ $JSON_key ]['signature'] = \DevHub\get_signature( $post_item->ID );
	$wp_parser_json[ $item['json_file'] ][ $JSON_key ]['notice']    = $notice;
	$wp_parser_json_types[ $post_types[ $post_item->post_type ] ][] = $slug;


	add_filter( 'the_title',         'wporg_filter_archive_title', 10, 2 );
	add_filter( 'single_post_title', 'wporg_filter_archive_title', 10, 2 );

	remove_filter( 'the_permalink', 'wporg_developer_child_update_site_permalink', 101 );
	remove_filter( 'post_link', 'wporg_developer_child_update_site_permalink', 101 );
	remove_filter( 'post_type_link', 'wporg_developer_child_update_site_permalink', 101 );
	remove_filter( 'post_type_archive_link', 'wporg_developer_child_update_site_permalink', 101 );
	wp_reset_postdata();

	return $item;
}

function wporg_developer_child_update_site_permalink( $permalink ) {
	$reference = wporg_developer_child_get_reference();

	if ( ! $reference['homepage'] ) {
		return $permalink;
	}

	$homepage = $reference['homepage'];

	$method = site_url( '/method/' );

	$permalink = str_replace( $method, trailingslashit( $homepage ) . 'classes/', $permalink );

	$url = site_url( '/reference/' );
	$permalink = str_replace( $url, trailingslashit( $homepage ), $permalink );
	return $permalink;
}

function sanitize_html( $html ) {
	$html = preg_replace( '/[\t\n]+/', '', $html );
	return preg_replace( '/[\s]+/', ' ', $html );
}

function wporg_developer_child_get_template( $template, $post_item ) {
	global $post;
	$post = $post_item;
	ob_start();
	get_template_part( 'child-theme/reference/template', $template );
	$template = ob_get_clean();
	wp_reset_postdata();
	return $template;
}

function wporg_developer_child_get_post_types() {
	return  array(
		'wp-parser-class'    => 'classes',
		'wp-parser-function' => 'functions',
		'wp-parser-hook'     => 'hooks',
		'wp-parser-method'   => 'methods',
	);
}

function wporg_developer_child_get_permalink( $post ) {

	$post = get_post( $post );
	$reference = wporg_developer_child_get_reference();

	$app_name = $reference['app_basename'];
	$location = '/' . $app_name;
	$location = ( '/' === $location ) ? '' : $location;
	$home = ! $location ? '/' . $app_name : $location;

	$post_types = wporg_developer_child_get_post_types();
	$post_type = $post_types[ $post->post_type ];

	$slug = basename( get_the_permalink( $post->ID ) );
	if ( $post->post_parent && ( 'methods' === $post_type ) ) {
		$parent = get_post( $post->post_parent );
		$slug = $parent->post_name . '/' . $slug;
	}

	$post_type = ( 'methods' === $post_type ) ? 'classes' : $post_type;

	return '/' . $post_type . '/' . $slug;
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
				add_settings_error( 'wp-parser-json', 'create_directory', $error, 'error' );
				return false;
			}

			wporg_developer_child_copy_dir( $old . '/' . $dir['name'], $new . '/' . $dir['name'] );
		}

		if ( 'f' === $dir['type'] ) {

			if (  ".zip" === substr( $dir['name'], -4 ) ) {
				continue;
			}

			if ( ! $wp_filesystem->move( $old . '/' . $dir['name'], $new . '/' . $dir['name'] ) ) {
				$error = esc_html__( "Unable to copy file {$new['name']}"  , 'wporg-developer-child' );
				add_settings_error( 'wp-parser-json', 'create_directory', $error, 'error' );
				return false;
			}
		}
	}

	return true;
}

function wporg_developer_child_generate_files() {
	global $wp_parser_json, $wp_parser_json_types, $wp_parser_json_terms;
	if ( ! is_array( $wp_parser_json ) || empty( $wp_parser_json ) ) {
		return;
	}

	if ( ! ( defined( 'WP_PARSER_JSON_DIR' ) && WP_PARSER_JSON_DIR ) ) {
		return;
	}

	// Okay, let's see about getting credentials.
	$wp_cli      = defined( 'WP_CLI' ) && WP_CLI;
	$form_fields = array();
	$method      = ''; // TODO TESTING
	$theme_dir   = get_stylesheet_directory() . '/src';
	$settings    = wporg_developer_child_get_reference();

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
		add_settings_error( 'wp-parser-json', 'delete_directory', $error, 'error' );
		return false;
	}


	// Delete theme directory (and files) if it exists.
	if ( $wp_filesystem->exists( $theme_dir . '/json-files' ) ) {
		if ( ! $wp_filesystem->rmdir( $theme_dir . '/json-files', true ) ) {
			$error = esc_html__( "Unable to delete directory $dir", 'wporg-developer-child' );
			add_settings_error( 'wp-parser-json', 'delete_directory', $error, 'error' );
			return false;
		}
	}

	// Create json-files directory
	if ( ! $wp_filesystem->mkdir( $theme_dir . '/json-files' ) ) {
		$error = esc_html__( "Unable to create directory"  , 'wporg-developer-child' );
		add_settings_error( 'wp-parser-json', 'create_directory', $error, 'error' );
		return false;
	}

	// Create /files directory
	if ( ! $wp_filesystem->mkdir( $theme_dir . '/json-files/files' ) ) {
		$error = esc_html__( "Unable to create directory"  , 'wporg-developer-child' );
		add_settings_error( 'wp-parser-json', 'create_directory', $error, 'error' );
		return false;
	}

	// Create /files directory
	if ( ! $wp_filesystem->mkdir( $theme_dir . '/json-files/post-types' ) ) {
		$error = esc_html__( "Unable to create directory"  , 'wporg-developer-child' );
		add_settings_error( 'wp-parser-json', 'create_directory', $error, 'error' );
		return false;
	}

	// Copy the json-files directory from the wp-parser-json directory
	$copy = wporg_developer_child_copy_dir( WP_PARSER_JSON_DIR . '/json-files', $theme_dir . '/json-files/post-types' );
	if ( ! $copy ) {
		$error = esc_html__( "Unable to copy files"  , 'wporg-developer-child' );
		add_settings_error( 'wp-parser-json', 'create_directory', $error, 'error' );
		return false;
	} else {
		if ( $wp_cli ) {
			WP_CLI::success( "Moved JSON files to {$theme_dir}/json-files" );
		}
	}

	$with_data = array();
	foreach ( wporg_developer_child_parse_post_types() as $post_type => $slug ) {
		if ( is_readable( $theme_dir . "/json-files/post-types/{$post_type}.json" ) ) {
			$content = file_get_contents( $theme_dir . "/json-files/post-types/{$post_type}.json" );
			$content = json_decode( $content, true );
			if ( isset( $content['content'] ) && ! empty( $content['content'] ) ) {
				$with_data[] = $post_type;
			}
		}
	}

	if ( $with_data ) {
		$file = $theme_dir . '/json-files/with-data.json';
		$content = json_encode( $with_data );
		if ( $wp_cli ) {
			WP_CLI::log( "Generating with-data.json file..." );
		}
		if ( ! $wp_filesystem->put_contents( $file, $content, FS_CHMOD_FILE ) ) {
			$error = esc_html__( "Unable to create the file: with-data.json", 'wporg-developer-child' );
			add_settings_error( 'wp-parser-json', 'create_file', $error, 'error' );
			return false;
		}
	}

	// Create the php files.
	foreach ( $wp_parser_json as $slug => $content ) {
		if ( $wp_cli ) {
			WP_CLI::log( "Generating {$slug}.json file..." );
		}
		$file = $theme_dir . '/json-files/files/' . $slug . '.json';
		$content = json_encode( $content );
		if ( ! $wp_filesystem->put_contents( $file, $content, FS_CHMOD_FILE ) ) {
			$error = esc_html__( "Unable to create the file: {$slug}.json", 'wporg-developer-child' );
			add_settings_error( 'wp-parser-json', 'create_file', $error, 'error' );
			return false;
		}
	}

	if ( $wp_cli ) {
		WP_CLI::log( "Generating wp-parser-json-strings.json file..." );
	}
	$file = $theme_dir . '/json-files/wp-parser-json-strings.json';
	$content = json_encode( wporg_developer_child_get_localized_strings() );

	// Create the strings file
	if ( ! $wp_filesystem->put_contents( $file, $content, FS_CHMOD_FILE ) ) {
		$error = esc_html__( "Unable to create the file: {$file}", 'wporg-developer-child' );
		add_settings_error( 'wp-parser-json', 'create_file', $error, 'error' );
		return false;
	}

	if ( $wp_cli ) {
		WP_CLI::log( "Generating reference.json file..." );
	}
	$file = $theme_dir . '/json-files/reference.json';
	$content = json_encode( $settings, JSON_PRETTY_PRINT );

	// Create the reference file
	if ( ! $wp_filesystem->put_contents( $file, $content, FS_CHMOD_FILE ) ) {
		$error = esc_html__( "Unable to create the file: {$file}", 'wporg-developer-child' );
		add_settings_error( 'wp-parser-json', 'create_file', $error, 'error' );
		return false;
	}

	if ( $wp_cli ) {
		WP_CLI::log( "Generating terms.json file..." );
	}
	$file = $theme_dir . '/json-files/terms.json';
	$content = json_encode( $wp_parser_json_terms );

	// Create the strings file
	if ( ! $wp_filesystem->put_contents( $file, $content, FS_CHMOD_FILE ) ) {
		$error = esc_html__( "Unable to create the file: {$file}", 'wporg-developer-child' );
		add_settings_error( 'wp-parser-json', 'create_file', $error, 'error' );
		return false;
	}

	$theme_dir = get_stylesheet_directory();

	if ( $wp_cli ) {
		WP_CLI::log( "Updating manifest.json file..." );
	}
	$file = $theme_dir . '/public/manifest.json';
	$content = json_encode( wporg_developer_child_get_manifest(), JSON_PRETTY_PRINT );

	// Create the manifest file
	if ( ! $wp_filesystem->put_contents( $file, $content, FS_CHMOD_FILE ) ) {
		$error = esc_html__( "Unable to create the file: {$file}", 'wporg-developer-child' );
		add_settings_error( 'wp-parser-json', 'create_file', $error, 'error' );
		return false;
	}

	$file = $theme_dir . '/package.json';

	if ( is_readable( $file ) ) {
		if ( $wp_cli ) {
			WP_CLI::log( "Updating package.json file..." );
		}
		$content = file_get_contents( $file );
		$content = json_decode( $content, true );
		$content['homepage'] = $settings['homepage'];
		$content = wp_json_encode( $content, JSON_PRETTY_PRINT );

		// Update homepage in package.json
		if ( ! $wp_filesystem->put_contents( $file, $content, FS_CHMOD_FILE ) ) {
			$error = esc_html__( "Unable to create the file: {$file}", 'wporg-developer-child' );
			add_settings_error( 'wp-parser-json', 'create_file', $error, 'error' );
			return false;
		}
	}

	$file = $theme_dir . '/public/index.html';

	if ( is_readable( $file ) ) {
		if ( $wp_cli ) {
			WP_CLI::log( "Updating index.html file..." );
		}
		$content = file_get_contents( $file );
		$content = preg_replace( '/<title>(.*?)<\/title>/', "<title>{$settings['parsed_name']}</title>" , $content );

		// Update title in index.html
		if ( ! $wp_filesystem->put_contents( $file, $content, FS_CHMOD_FILE ) ) {
			$error = esc_html__( "Unable to create the file: {$file}", 'wporg-developer-child' );
			add_settings_error( 'wp-parser-json', 'create_file', $error, 'error' );
			return false;
		}
	}

	$file = $theme_dir . '/public/404.html';

	if ( is_readable( $file ) ) {
		if ( $wp_cli ) {
			WP_CLI::log( "Updating 404.html file..." );
		}
		$content = file_get_contents( $file );
		$content = preg_replace( '/<title>(.*?)<\/title>/', "<title>{$settings['parsed_name']}</title>" , $content );

		// Update title in 404.html
		if ( ! $wp_filesystem->put_contents( $file, $content, FS_CHMOD_FILE ) ) {
			$error = esc_html__( "Unable to create the file: {$file}", 'wporg-developer-child' );
			add_settings_error( 'wp-parser-json', 'create_file', $error, 'error' );
			return false;
		}
	}

	if ( $wp_cli ) {
		WP_CLI::success( 'JSON files generated' );
	}

	return false;
}
