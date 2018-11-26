import React from "react";

import PrimaryTemplate from "../primary-template";
import HomeTemplate from "./home-template.jsx";

const Home = props => {
	return (
		<PrimaryTemplate {...props} postType="functions" request="home">
			<HomeTemplate {...props} />
		</PrimaryTemplate>
	);
};

export default Home;