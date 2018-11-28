import React from "react";

import PrimaryHeader from "./primary-header";
import Strings from "../json-files/wp-parser-json-strings.json";

const PrimaryTemplate = props => {
	const {page, children} = props;
	const classes = "hfeed site devhub-wrap";
	const pageClass = page ? classes + ' ' + page : classes;
	return (
		<div id="page" className={pageClass}>
			<PrimaryHeader {...props} strings={Strings} />
			<div id="content" className="site-content">
				<div id="content-area" className="code-reference">
					<main id="main" className="site-main" role="main">
						{children}
					</main>
				</div>
			</div>
		</div>
	);
};

export default PrimaryTemplate;