import React from "react";

import HomeTemplate from "./home-template";
import { DataContext } from "../../contexts/DataContext";

const Home = props => {
	return <DataContext.Consumer>
			{({ postType, state, fetchData }) => (<HomeTemplate {...props} postType="functions" state={state} fetchData={fetchData} />)}
		</DataContext.Consumer>
};

export default Home;