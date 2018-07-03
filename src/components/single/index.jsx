import React from "react";
import { Redirect } from "react-router-dom";

import SingleTemplate from "./single-template";
import { DataContext } from "../../contexts/DataContext";
import { getPostType, isSingle } from "../../data/post-type-data";

const Single = props => {
	const route = props.location.pathname;
	const postTypeIndex = props.postTypeIndex;

	if (!isSingle(route, postTypeIndex)) {
		return <Redirect to={props.home} />;
	}

	const postTyped = getPostType(route, postTypeIndex);
	return <DataContext.Consumer>
			{({ postType, state, fetchData }) => (<SingleTemplate {...props} postType={postTyped} state={state} fetchData={fetchData} />)}
			</DataContext.Consumer>
}

export default Single;