import React from 'react';
import { trim } from 'lodash';
import Strings from '../json-files/wp-parser-json-strings.json';

const Source = props => {
	const { line_num, source_file } = props.element;
	const { repo_release_url } = props.packageData.reference;

	if (!source_file.length) {
		return null;
	}

	let view = Strings['source_file'].replace('%1$s', source_file);
	let url = '';
	let urlText = '';
	let link = false;
	if (repo_release_url.length) {
		urlText = Strings.view_source_file;
		url = trim(repo_release_url, '/') + '/' + source_file;
		if (line_num.length) {
			urlText = Strings.view_source;
			url += '#L' + line_num;
		}
	}

	if (url.length && urlText) {
		link = (<a href={url} target="_blank">{urlText}</a>);
		return (<p>{view}{' ('}{link}{')'}</p>);
	}

	return (<p>{view}</p>);
}

export default Source;