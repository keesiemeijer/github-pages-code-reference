import React from "react";

import { DataContext } from "../../contexts/DataContext";
import PrimaryTemplate from "../primary-template";
import TemplateLoader from "../template-loader";


const Home = props => {
	return (
		<PrimaryTemplate {...props} postType="functions" request="home">
	<DataContext.Consumer>
	{
		({ postType, postTypeData, fetchData }) => (
			<TemplateLoader {...props}
				postType="functions"
				postTypeData={postTypeData}
				fetchData={fetchData}
				request="home"
			/>)
	}
	</DataContext.Consumer>
	</PrimaryTemplate>);
};

export default Home;