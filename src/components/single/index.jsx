import React from "react";
import { Redirect } from "react-router-dom";

import { DataContext } from "../../contexts/DataContext";
import { getPostType, getSlug, isSingle } from "../../data/post-data";
import PrimaryTemplate from "../primary-template";
import TemplateLoader from "../template-loader";

const Single = props => {
	const route = props.location.pathname;
	const routeIndex = props.routeIndex;
	const routePostType = getPostType(route, routeIndex);

	if (!isSingle(route, routeIndex)) {
		return (<Redirect to={props.home} />);
	}

	let slug = getSlug(route, routeIndex + 1);
	if ("methods" === routePostType) {
		slug += "::" + getSlug(route, routeIndex + 2);
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
						/>
					)
				}
			</DataContext.Consumer>
		</PrimaryTemplate>
	);
}

export default Single;