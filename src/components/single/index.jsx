import React from "react";
import { Redirect } from "react-router-dom";

import { DataContext } from "../../contexts/DataContext";
import { getPostType, getSlug, isSingle } from "../../data/post-data";
import PrimaryTemplate from "../primary-template";
import TemplateLoader from "../template-loader";

const Single = props => {
	const route = props.location.pathname;
	const postTypeIndex = props.postTypeIndex;
	const routePostType = getPostType(route, postTypeIndex);

	if (!isSingle(route, postTypeIndex)) {
		return (<Redirect to={props.home} />);
	}

	let slug = getSlug(route, postTypeIndex + 1);
	if ("methods" === routePostType) {
		slug += "::" + getSlug(route, postTypeIndex + 2);
	}

	return (
		<PrimaryTemplate {...props} postType={routePostType}>
	<DataContext.Consumer>
	{
		({ postType, postTypeData, fetchData }) => (
			<TemplateLoader {...props}
				postType={routePostType}
				postTypeData={postTypeData}
				fetchData={fetchData}
				request="single"
				slug={slug}
			/>)
	}
		</DataContext.Consumer>
	</PrimaryTemplate>
	);
}

export default Single;