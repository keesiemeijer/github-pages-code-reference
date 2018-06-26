<?php

function wporg_developer_child_get_localized_strings() {
	// Edit the localized strings to suit your needs.

	return array(
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
}

function wporg_developer_child_get_post_types_to_parse() {
	// Edit the post types to suit your needs.
	return array(
		'functions' => 'wp-parser-function',
		'hooks'     => 'wp-parser-hook',
		'classes'   => 'wp-parser-class',
		'methods'   => 'wp-parser-method',
	);
}
