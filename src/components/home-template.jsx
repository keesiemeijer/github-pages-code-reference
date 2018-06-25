import React from "react";

import WithParsedData from "../data/parsed-data";
import PrimaryTemplate from "./primary-template";
import HomeContent from "../templates/home-content";

const HomeTemplate = props => {
	return (
		<PrimaryTemplate {...props} isHome={true}>
			<HomeContent {...props} />
		</PrimaryTemplate>
	);
};

export default WithParsedData(HomeTemplate);