<?php
namespace DevHub;

function get_method_items() {
	$methods = array();

	if ( 'wp-parser-class' !== get_post_type() ) {
		return $methods;
	}

	global $post;
	$tmp_post = $post;

	$args = array(
		'post_parent' => $post->ID,
		'post_status' => 'publish',
		''
	);

	$children = get_children( $args );
	if ( ! $children ) {
		return $methods;
	}

	usort( $children, __NAMESPACE__ . '\\compare_objects_by_name' );
	$i = 0;

	foreach ( $children as $child ) {
		$post = $child;
		setup_postdata($child);
		$methods[ $i ]['url'] = wporg_developer_child_get_permalink( $post );
		$title                  = get_the_title( $post );
		$pos                    = ( $j = strrpos( $title, ':' ) ) ? $j + 1 : 0;
		$methods[ $i ]['title'] = substr( $title, $pos );

		$methods[ $i ]['excerpt'] = '';
		if ( $excerpt = apply_filters( 'get_the_excerpt', $post->post_excerpt, $post ) ) {
			$methods[ $i ]['excerpt'] = sanitize_text_field( $excerpt );
		}

		$methods[ $i ]['deprecated'] = is_deprecated( $post->ID );

		$i++;
	}

	 $post = $tmp_post;

	return $methods;
}
