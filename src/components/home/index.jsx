import React from "react";

import { DataContext } from "../../contexts/DataContext";
import PrimaryTemplate from "../primary-template";
import TemplateLoader from "../template-loader";


const Home = props => {
	return (
		<PrimaryTemplate {...props} postType="functions">
	<DataContext.Consumer>
	{
		({ postType, state, fetchData }) => (
			<TemplateLoader {...props}
				postType="functions"
				state={state}
				fetchData={fetchData}
				type="home"
			/>)
	}
	</DataContext.Consumer>
	</PrimaryTemplate>);
};

export default Home;