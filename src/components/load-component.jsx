import React from "react";

import Strings from "../json-files/wp-parser-json-strings.json";

const LoadComponent = props => {
	let returnContent = '';

	if (props.error) {
		returnContent = (<div>{Strings['error']} <button onClick={ props.retry }>{Strings['retry']}</button></div>);
	} else if (props.timedOut) {
		returnContent = (<div>{Strings['timeout']}<button onClick={ props.retry }>{Strings['retry']}</button></div>);
	} else if (props.pastDelay) {
		returnContent = (<div>{Strings['loading']}...</div>);
	} else {
		return null;
	}

	return (
		<div id="page" className="hfeed site devhub-wrap">
			<header className="site-header">
			</header>
			<div id="content" className="site-content">
				<div id="content-area" className="code-reference">
					<main id="main" className="site-main" role="main">
						{returnContent}
					</main>
				</div>
			</div>
		</div>
	)
}

export default LoadComponent;