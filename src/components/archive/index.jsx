import React from "react";

import { DataContext } from "../../contexts/DataContext";
import { getPostType } from "../../data/post-type-data";
import PrimaryTemplate from "../primary-template";
import TemplateLoader from "../template-loader";

const Archive = props => {
	const route = props.location.pathname;
	const postTypeIndex = props.postTypeIndex;
	const routePostType = getPostType(route, postTypeIndex);

	return (
		<PrimaryTemplate {...props} postType={routePostType}>
	<DataContext.Consumer>
	{
		({ postType, state, fetchData }) => (
			<TemplateLoader {...props}
				postType={routePostType}
				state={state}
				fetchData={fetchData}
				type="archive"
			/>)
	}
		</DataContext.Consumer>
	</PrimaryTemplate>
	)
};

export default Archive;