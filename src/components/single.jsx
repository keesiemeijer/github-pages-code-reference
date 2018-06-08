import React from 'react';
import { Redirect } from 'react-router-dom';
import { trim } from 'lodash';

import SingleTemplate from './single-template';

const Single = props => {
	let pathParts = trim( props.location.pathname, '/' ).split( '/' );
	pathParts = pathParts.filter( value => value !== '' );

	if ( !( 3 === pathParts.length ) ) {
		return ( <Redirect to={"/" + pathParts[0] } /> );
	}

	const postType = pathParts[1];
	const slug = pathParts[2];

	return (
		<SingleTemplate 
			postType={postType} 
			slug={slug}
		/>
	);
}

export default Single;
