import React from 'react';

import Strings from '../../json-files/wp-parser-json-strings.json';

const HomeContent = props => {
	const { parsed_name, repo_url, app_url, parsed_type } = props.referenceData;
	let title = '';

	if (parsed_name.length) {
		title = Strings['page_title'];
	}

	const repo = Strings['repo'] ? Strings['repo'] : 'GitHub';
	const type = parsed_type.length ? parsed_type : Strings['code_base'];

	let description = '';
	if (type.length) {
		description = Strings['home_desc'].replace('%1$s', type);
	}

	let appLink = '';
	if (app_url && parsed_name) {
		appLink = (<li><a href={app_url}>{parsed_name}</a></li>)
	}

	let repoLink = '';
	if (repo_url && repo.length) {
		repoLink = (<li><a href={repo_url}>{repo}</a></li>)
	}

	return (
		<div>
			{title && <h2>{title}</h2>}
			<p>{description} {Strings['home_desc-2']}</p>
			{(appLink || repoLink) && <ul>{appLink}{repoLink}</ul>}
		</div>
	)
}

export default HomeContent;