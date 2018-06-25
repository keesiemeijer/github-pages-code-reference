import React from "react";
import { Redirect } from "react-router-dom";
import Loadable from 'react-loadable';

import LoadComponent from "./load-component";
import { getPostType, isSingle, getSlug } from "../data/post-type-data";

const SingleTemplate = Loadable({
	loader: () =>
		import ('./single-template'),
	loading: LoadComponent,
	delay: 500,
});

const Single = props => {
	const route = props.location.pathname;
	const postTypeIndex = props.postTypeIndex;

	if (!isSingle(route, postTypeIndex)) {
		return <Redirect to={props.home} />;
	}

	const postType = getPostType(route, postTypeIndex);

	let slug = getSlug(route, postTypeIndex + 1);
	if ("methods" === postType) {
		slug += "::" + getSlug(route, postTypeIndex + 2);
	}

	return <SingleTemplate {...props} postType={postType} slug={slug} />;
};

export default Single;