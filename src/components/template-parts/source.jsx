import React from 'react';
import { Link } from 'react-router-dom';

import trim from 'lodash/trim';

import Strings from '../../json-files/wp-parser-json-strings.json';
import {getLink} from '../../data/selectors';


const Source = props => {
	const { line_num, source_file, parent, namespace } = props.element;
	const { repo_release_url } = props.referenceData;

	if (!source_file.length) {
		return null;
	}

	let view = Strings['source_file'].replace('%1$s', source_file);
	let url = '';
	let urlText = '';
	let link = false;
	let parentClass = '';
	let parentEl = '';
	let namespaceEl = '';

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
		let parentSlug = props.slug.split('::');
		if (2 === parentSlug.length) {
			parentEl = (<Link to={getLink(props.home, '/classes/' + parentSlug[0])}>{parent}</Link>);
		}
		parentClass = (<li>{Strings.class}: {parentEl}</li>)
	}
	if (namespace.length && ('global' !== namespace.toLowerCase())) {
		namespaceEl = (<li>{Strings['namespace'].replace('%1$s', namespace )}</li>);
	}

	if (url.length && urlText) {
		link = (<a href={url} target="_blank" rel="noopener noreferrer">{urlText}</a>);
		return (<ul className="source-info">{parentClass}{namespaceEl}<li>{view}{' — '}{link}</li></ul>);
	}

	return (<ul className="source-info">{parentClass}{namespaceEl}<li>{view}</li></ul>);
}

export default Source;