import React from "react";

import Loadable from 'react-loadable';

import { getPostType } from "../data/post-type-data";
import LoadComponent from "./load-component";

const ArchiveTemplate = Loadable({
	loader: () =>
		import ('./archive-template'),
	loading: LoadComponent,
	delay: 500,
});

const Archive = props => {
	const postType = getPostType(props.location.pathname, props.postTypeIndex);
	const title = postType.charAt(0).toUpperCase() + postType.slice(1);

	return <ArchiveTemplate {...props} postType={postType} title={title} />;
};

export default Archive;