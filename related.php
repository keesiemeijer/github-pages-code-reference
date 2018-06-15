<?php
namespace DevHub;


function get_related_items() {

	$related = array(
		'uses'    => array(),
		'used_by' => array(),
	);

	if ( ! show_usage_info() ) {
		return $related;
	}

	$has_uses    = ( post_type_has_uses_info()  && ( $uses    = get_uses()    ) && $uses->have_posts()    );
	$has_used_by = ( post_type_has_usage_info() && ( $used_by = get_used_by() ) && $used_by->have_posts() );

	if ( $has_uses ) {	
		while ( $uses->have_posts() ) {
			$uses->the_post();

			$suffix = '';
			if ( ! in_array( get_post_type(), array( 'wp-parser-class', 'wp-parser-hook' ) ) ) {
				$suffix = '()';
			}

			$permalink = get_permalink();
			$parsed_url = parse_url( $permalink );

			$related['uses'][] = array(
				'source' => get_source_file(),
				'url'    => wporg_developer_child_get_permalink(get_the_ID()),
				'text'   => get_the_title() . $suffix,
			);
		}
		wp_reset_postdata();
	}

	if ( $has_used_by ) {
		while ( $used_by->have_posts() ) {
			$used_by->the_post();

			$suffix = '';
			if ( ! in_array( get_post_type(), array( 'wp-parser-class', 'wp-parser-hook' ) ) ) {
				$suffix = '()';
			}

			$permalink = get_permalink();
			$parsed_url = parse_url( $permalink );

			$related['used_by'][] = array(
				'source' => get_source_file(),
				'url'    => untrailingslashit( $parsed_url['path'] ),
				'text'   => get_the_title() . $suffix,
			);
		}
		wp_reset_postdata();
	}

	return $related;
}
