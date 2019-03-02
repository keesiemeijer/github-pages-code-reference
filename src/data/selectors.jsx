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

export function queryVarExists(query, queryVar) {
	const queryVars = getQueryStringParams(query);
	if (queryVars.hasOwnProperty(queryVar)) {
		return true;
	}
	return false;
}

export function getLink(home, path = '') {
	if (!path.length) {
		return home;
	}

	// trim slashes and spaces.
	home = trim(home, ' /');
	path = trim(path, ' /');

	return '/' + home + ('' === path ? '' : '/') + path;
}

export function postTypeExists(postType) {
	const allowed = ['functions', 'hooks', 'classes', 'methods'];
	const exists = allowed.filter((value) => postType === value);

	return exists.length === 1;
}

export function getPostTypeSingle(postType) {
	if (!postType.length || !postTypeExists(postType)) {
		return '';
	}

	let single = postType.substring(0, postType.length - 1);
	return ('classe' === single) ? 'class' : single;
}

export function getPostClass(postType) {
	const postClass = getPostTypeSingle(postType);
	if (!postClass.length) {
		return '';
	}

	return 'wp-parser-' + postClass;
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

export function sortByLength(a, b) {
	a = a.title;
	b = b.title;
	if (a.length !== b.length) {
		return a.length - b.length;
	}

	return a < b ? -1 : 1;
}