import React from 'react';

import PrimaryHeader from './primary-header';
import WithPackageData from '../data/package-data';
import HomeContent from '../templates/home-content';

const HomeTemplate = props => {
	let appName = props['package']['appname'];
	const postType = 'functions';

	const strings = require('../json-files/wp-parser-json-strings.json');

	return (
		<div id="page" className="hfeed site devhub-wrap">
			<PrimaryHeader appName={appName} postType={postType} strings={strings}/>
			<div id="content" className="site-content">
				<div id="content-area" className="code-reference">
					<main id="main" className="site-main" role="main">
						<HomeContent/>     
					</main>
				</div>
			</div>
		</div>
	)
}

export default WithPackageData(HomeTemplate);
