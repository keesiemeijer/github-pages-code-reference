import trim from 'lodash/trim';

export function getPathParts(route) {
	return trim(route, '/').split('/').filter(value => value !== '');
}

export function getQueryStringParams(query) {
	return query ?
		(/^[?#]/.test(query) ? query.slice(1) : query)
		.split('&')
		.reduce((params, param) => {
			let [key, value] = param.split('=');
			params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
			return params;
		}, {}) : {}
};

export function getQueryVar(query, queryVar) {
	const queryVars = getQueryStringParams(query);
	if (queryVars.hasOwnProperty(queryVar) && queryVars[queryVar].length) {
		return queryVars[queryVar];
	}
	return '';
}

export function homeLink(home, path = '') {
	if (!path.length) {
		return home;
	}

	// trim slashes and spaces.
	home = trim( home, ' /' );
	path = trim( path, ' /' );
	
	return '/' + home + ('' === path ? '' : '/') + path;
}

export function postTypeExists(postType) {
	const allowed = ['functions', 'hooks', 'classes', 'methods'];
	const postTypes = allowed.filter((item) => postType === item);

	return postTypes.length === 1;
}

export function filterTypeExists(status) {
	const allowed = ['introduced', 'modified', 'deprecated'];
	const stati = allowed.filter((value) => status === value);

	return stati.length === 1;
}

export function getPostClass(postType) {
	if (!postTypeExists(postType)) {
		return '';
	}

	let post_class = postType.substring(0, postType.length - 1);
	post_class = ('classe' === post_class) ? 'class' : post_class;

	return 'wp-parser-' + post_class;
}

export function getSlug(route, index) {
	let slug = '';
	let pathParts = getPathParts(route);

	if (index <= pathParts.length) {
		slug = pathParts[index];
	}

	return slug
}

export function isValidRouteLength(route, length) {
	const pathParts = getPathParts(route);

	if (length === pathParts.length) {
		return true;
	}

	return false;
}