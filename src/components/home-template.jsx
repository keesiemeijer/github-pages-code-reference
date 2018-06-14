import React from "react";

import WithParsedData from "../data/parsed-data";
import PrimaryHeader from "./primary-header";
import HomeContent from "../templates/home-content";
import Strings from "../json-files/wp-parser-json-strings.json";

const HomeTemplate = props => {
	return (
		<div id="page" className="hfeed site devhub-wrap">
			<PrimaryHeader {...props} strings={Strings} isHome={true} />
			<div id="content" className="site-content">
				<div id="content-area" className="code-reference">
					<main id="main" className="site-main" role="main">
						<HomeContent />
					</main>
				</div>
			</div>
		</div>
	);
};

export default WithParsedData(HomeTemplate);