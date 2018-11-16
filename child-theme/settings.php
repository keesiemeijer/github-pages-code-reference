<?php

function wporg_developer_child_get_reference() {
	$defaults         = wporg_developer_child_get_defaults();
	$reference_config = wporg_developer_child_get_reference_config();
	$defaults         = array_merge( $defaults, $reference_config );

	$reference = apply_filters( 'github_pages_code_reference_settings', $defaults );

	if ( ! $reference['parsed_name'] ) {
		$reference['parsed_name'] = __( 'Code Reference', 'wporg-developer-child' );
	}

	return array_merge( $defaults, $reference );
}

function wporg_developer_child_get_reference_config() {
	global $wp_parser_reference_config;
	if ( is_array( $wp_parser_reference_config ) ) {
		return $wp_parser_reference_config;
	}

	$wp_parser_reference_config = array();

	$reference_file = get_stylesheet_directory() . '/reference.json';
	if ( is_readable( $reference_file ) ) {
		$content = file_get_contents( $reference_file );
		$content = json_decode( $content, true );
		if ( is_array( $content ) ) {
			$wp_parser_reference_config = $content;
		}
	}

	return $wp_parser_reference_config;
}

function wporg_developer_child_get_defaults() {
	return array(
		'homepage'         => 'https://username.github.io/example-repository',
		'app_basename'     => 'example-repository',
		'app_description'  => 'Code Reference',
		'app_url'          => 'https://example.com/code-homepage',
		'app_docs_url'     => '',
		'repo_url'         => 'https://github.com/username/example-repository',
		'repo_release_url' => 'https://github.com/username/example-repository/tree/1.0.0',
		'repo_gh_pages'    => 'https://github.com/username/example-repository.git',
		'parsed_name'      => 'Example Reference',
		'parsed_version'   => 'v1.0',
		'parsed_type'      => 'plugin',
	);
}

function wporg_developer_child_get_localized_strings() {
	// Edit the localized strings to suit your needs.
	$strings = array(
		'page_title'       => __( 'Search The Code Reference!', 'wporg-developer-child' ),
		'home_desc'        => __( 'Want to know what\'s going on inside this %1$s.', 'wporg-developer-child' ),
		'home_desc-2'      => __( 'Search the Code Reference for more information about functions, classes, methods, and hooks.', 'wporg-developer-child' ),
		'home'             => __( 'Home', 'wporg-developer-child' ),
		'functions'        => __( 'Functions', 'wporg-developer-child' ),
		'classes'          => __( 'Classes', 'wporg-developer-child' ),
		'class'            => __( 'Class', 'wporg-developer-child' ),
		'hooks'            => __( 'Hooks', 'wporg-developer-child' ),
		'methods'          => __( 'Methods', 'wporg-developer-child' ),
		'functions_search' => __( 'Search functions', 'wporg-developer-child' ),
		'classes_search'   => __( 'Search classes', 'wporg-developer-child' ),
		'hooks_search'     => __( 'Search hooks', 'wporg-developer-child' ),
		'methods_search'   => __( 'Search methods', 'wporg-developer-child' ),
		'source'           => __( 'Source', 'wporg-developer-child' ),
		'source_file'      => __( 'Source: %1$s', 'wporg-developer-child' ),
		'view_source'      => __( 'View source', 'wporg-developer-child' ),
		'view_source_file' => __( 'View source file', 'wporg-developer-child' ),
		'submit'           => __( 'Search', 'wporg-developer-child' ),
		'repo'             => __( 'GitHub Repository', 'wporg-developer-child' ),
		'docs'             => __( 'Documentation', 'wporg-developer-child' ),
		'related'          => __( 'Related', 'wporg-developer-child' ),
		'used_by'          => __( 'Used By', 'wporg-developer-child' ),
		'uses'             => __( 'Uses', 'wporg-developer-child' ),
		'changelog'        => __( 'Changelog', 'wporg-developer-child' ),
		'version'          => __( 'Version', 'wporg-developer-child' ),
		'description'      => __( 'Description', 'wporg-developer-child' ),
		'code_base'        => __( 'code base', 'wporg-developer-child' ),
		'loading'          => __( 'Loading', 'wporg-developer-child' ),
		'retry'            => __( 'Retry', 'wporg-developer-child' ),
		'timeout'          => __( 'Taking a long time...', 'wporg-developer-child' ),
		'error'            => __( 'Error!', 'wporg-developer-child' ),
		'namespace'        => __( 'Namespace: %1$s', 'wporg-developer-child' ),
	);

	return apply_filters( 'github_pages_code_reference_strings', $strings );
}

function wporg_developer_child_get_manifest() {
	$settings = wporg_developer_child_get_reference();
	$manifest = array (
		"short_name" => "code reference",
		"name"       => $settings['parsed_name'],
		"icons"      => array(
			array(
				"src"   => "favicon.ico",
				"sizes" => "64x64 32x32 24x24 16x16",
				"type"  => "image/x-icon"
			)
		),
		"start_url"        => "./index.html",
		"display"          => "standalone",
		"theme_color"      => "#000000",
		"background_color" => "#ffffff"
	);

	return apply_filters( 'github_pages_code_reference_manifest', $manifest );
}

function wporg_developer_child_get_post_types_to_parse() {
	// Edit the post types to suit your needs.
	$post_types = array(
		'functions' => 'wp-parser-function',
		'hooks'     => 'wp-parser-hook',
		'classes'   => 'wp-parser-class',
		'methods'   => 'wp-parser-method',
	);

	return apply_filters( 'github_pages_code_reference_post_types', $post_types );
}
