import React from 'react';
import { trim } from 'lodash';

import WithParsedData from '../data/parsed-data';

const ArchivePaged = props => {
	let pathParts = trim(props.location.pathname, '/').split('/');
	pathParts = pathParts.filter(value => value !== '');

	const type = pathParts[0];
	//const slug = pathParts[1];
	const paged = pathParts[2];

	return (
		<div>
			<h2>{type} Paged {paged}</h2>
		</div>
	);
}

export default WithParsedData(ArchivePaged);