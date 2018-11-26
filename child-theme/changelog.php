<?php
namespace DevHub;

function get_changelog_items( $post_id ) {
	$items = array();

	$changelog_data = get_changelog_data( $post_id );
	if ( empty( $changelog_data ) ) {
		return $items;
	}

	$count = count( $changelog_data );
	$i = 0;

	$changelog_data = array_reverse( $changelog_data );

	foreach ( $changelog_data as $version => $data ) {
		// Add "Introduced." for the initial version description, last since the array is reversed.
		$items[ $i ]['description'] = ( $i == ( $count - 1 ) ) ? __( 'Introduced.', 'wporg' ) : $data['description'];
		$items[ $i ]['version'] = $version;
		$i++;
	}

	return $items;
}
