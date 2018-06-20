import { trim } from 'lodash';

export function getPostType(route, postTypeIndex) {
	let postType = '';
	let pathParts = getPathParts(route);

	if (postTypeIndex + 1 <= pathParts.length) {
		postType = pathParts[postTypeIndex].toLowerCase();
	}

	if (!postType || !postTypeExists(postType)) {
		return '';
	}

	postType = (postTypeIndex + 3 === pathParts.length) ? 'methods' : postType;

	return postType;
}

export function postTypeExists(postType) {
	const allowed = ['functions', 'hooks', 'classes', 'methods'];
	const postTypes = allowed.filter((item) => postType === item);

	return postTypes.length === 1;
}

export function getPostClass(postType) {
	if (!postTypeExists(postType)) {
		return '';
	}

	let post_class = postType.substring(0, postType.length - 1);
	post_class = ('classe' === post_class) ? 'class' : post_class;

	return 'wp-parser-' + post_class;
}

export function getPathParts(route) {
	return trim(route, '/').split('/').filter(value => value !== '');
}

export function getSlug(route, index) {
	let slug = '';
	let pathParts = getPathParts(route);

	if (index <= pathParts.length) {
		slug = pathParts[index];
	}

	return slug
}

export function isSingle(route, postTypeIndex) {
	const pathParts = getPathParts(route);
	const postType = getPostType(route, postTypeIndex);

	if (!postType.length) {
		return false;
	}

	if ('methods' === postType) {
		if ((postTypeIndex + 3) === pathParts.length) {
			return true
		}
	} else {
		if ((postTypeIndex + 2) === pathParts.length) {
			return true;
		}
	}

	return false;
}