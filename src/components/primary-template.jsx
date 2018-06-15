import React from "react";

import PrimaryHeader from "./primary-header";
import Strings from "../json-files/wp-parser-json-strings.json";

const PrimaryTemplate = props => {
	return (
		<div id="page" className="hfeed site devhub-wrap">
			<PrimaryHeader {...props} strings={Strings} />
			<div id="content" className="site-content">
				<div id="content-area" className="code-reference">
					<main id="main" className="site-main" role="main">
						{props.children}
					</main>
				</div>
			</div>
		</div>
	);
};

export default PrimaryTemplate;
