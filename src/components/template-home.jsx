import React from "react";

import WithContext from "../data/with-context.jsx";
import PrimaryTemplate from "./primary-template";
import HomeContent from "./template-parts/home-content";

const Home = props => {
	console.log('home', props)
	return (
		<PrimaryTemplate {...props} page="home">
			<HomeContent {...props} />
		</PrimaryTemplate>
	);
};

export default WithContext(Home);