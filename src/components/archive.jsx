import React from 'react';
import { trim } from 'lodash';

import ArchiveTemplate from './archive-template';

const Archive = props => {
	let pathParts = trim( props.location.pathname, '/' ).split( '/' );
	pathParts = pathParts.filter( value => value !== '' );

	const type = pathParts[1].toLowerCase();
	const title = type.charAt(0).toUpperCase() + type.slice(1);
	
	return (
		<ArchiveTemplate 
			postType={type} 
			title={title}
		/>
	);
}

export default Archive;