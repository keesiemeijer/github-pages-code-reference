import { trim } from 'lodash';

export function getPostType( route ) {
	let postType = '';
	let pathParts = getPathParts( route );

	if( 2 <= pathParts.length) {
		postType = pathParts[1].toLowerCase();
	}

	if( !postType || !postTypeExists(postType)) {
		return '';
	}

	postType = ( 4 === pathParts.length ) ? 'methods' : postType;

	return postType;
}

export function postTypeExists( postType ) {
	const allowed = ['functions', 'hooks', 'classes'];
	const postTypes = allowed.filter( (item ) => postType === item );

	return postTypes.length === 1;
}

export function getPathParts( route ) {
	return trim( route, '/' ).split( '/' ).filter( value => value !== '' );
}

export function getSlug( route, index ) {
	let slug = '';
	let pathParts = getPathParts( route );

	if( index <= pathParts.length) {
		slug = pathParts[index];
	}

	return slug
}

export function isSingle( route ) {
	const pathParts = getPathParts( route );
	const postType = getPostType( route );

	if ('methods' === postType) {	
		if( 4 === pathParts.length ) {
			return true
		}
	} else {
		if ( ( 3 === pathParts.length ) ) {
			return true;
		}
	}

	return false;
}