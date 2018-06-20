import React from "react";

import ArchiveTemplate from "./archive-template";
import { getPostType } from "../data/post-type-data";

const Archive = props => {
	const postType = getPostType(props.location.pathname, props.postTypeIndex);
	const title = postType.charAt(0).toUpperCase() + postType.slice(1);

	return <ArchiveTemplate {...props} postType={postType} title={title} />;
};

export default Archive;