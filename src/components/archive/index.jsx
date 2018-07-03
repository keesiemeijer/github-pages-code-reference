import React from "react";

import Loadable from 'react-loadable';

import { getPostType } from "../../data/post-type-data";
import LoadComponent from "../load-component";
import { DataContext } from "../../contexts/DataContext";

const ArchiveTemplate = Loadable({
	loader: () =>
		import ('./archive-template'),
	loading: LoadComponent,
	delay: 500,
});

const Archive = props => {
	const postTyped = getPostType(props.location.pathname, props.postTypeIndex);

	return <DataContext.Consumer>
			{({ postType, state, fetchData }) => (<ArchiveTemplate {...props} postType={postTyped} state={state} fetchData={fetchData} />)}
			</DataContext.Consumer>
};

export default Archive;