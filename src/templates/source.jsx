import React from 'react';
import { Link } from 'react-router-dom';
import { trim } from 'lodash';
import Strings from '../json-files/wp-parser-json-strings.json';

const Source = props => {
	const { line_num, source_file, parent } = props.element;
	const { repo_release_url } = props.packageData.reference;
	const { slug, home } = props;
	const postTypeHome = ('/' === home) ? '' : home;

	if (!source_file.length) {
		return null;
	}

	let view = Strings['source_file'].replace('%1$s', source_file);
	let url = '';
	let urlText = '';
	let link = false;
	let parentClass = '';
	let parentEl = '';

	if (repo_release_url.length) {
		urlText = Strings.view_source_file;
		url = trim(repo_release_url, '/') + '/' + source_file;
		if (line_num.length) {
			urlText = Strings.view_source;
			url += '#L' + line_num;
		}
	}

	if (parent && ('methods' === props.postType)) {
		parentEl = parent;
		let parentSlug = slug.split('::');
		if (2 === parentSlug.length) {
			parentEl = (<Link to={postTypeHome + '/classes/' + parentSlug[0]}>{parent}</Link>);
		}
		parentClass = (<li>{Strings.class}: {parentEl}</li>)
	}

	if (url.length && urlText) {
		link = (<a href={url} target="_blank">{urlText}</a>);
		return (<ul className="source-info">{parentClass}<li>{view}{' ('}{link}{')'}</li></ul>);
	}

	return (<ul className="source-info">{parentClass}<li>{view}</li></ul>);
}

export default Source;