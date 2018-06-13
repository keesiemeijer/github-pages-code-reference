import React from 'react';
import { Redirect } from 'react-router-dom';

import SingleTemplate from './single-template';
import { getPostType, isSingle, getSlug} from '../data/post-type-data';

const Single = props => {

	if( ! isSingle( props.location.pathname )) {
		return ( <Redirect to={props.home } /> );
	}

	const postType = getPostType( props.location.pathname );

	let slug = getSlug( props.location.pathname, 2);
	if('methods' === postType) {
		slug += '::' + getSlug( props.location.pathname, 3);
	}

	return (
		<SingleTemplate {...props}
			postType={postType} 
			slug={slug}
		/>
	);
}

export default Single;
