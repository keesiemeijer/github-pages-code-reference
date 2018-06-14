<?php

function wporg_developer_child_get_localized_strings() {
	// Edit the localized strings to suit your needs.

	return array(
		'page_title'       => __( 'Search The Code Reference!', 'wporg-developer-child' ),
		'home'             => __( 'Home', 'wporg-developer-child' ),
		'functions'        => __( 'Functions', 'wporg-developer-child' ),
		'classes'          => __( 'Classes', 'wporg-developer-child' ),
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
		'submit'           => __( 'Submit', 'wporg-developer-child' ),
		'repo'             => __( 'Github Repository', 'wporg-developer-child' ),
		'docs'             => __( 'Documentation', 'wporg-developer-child' ),
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
