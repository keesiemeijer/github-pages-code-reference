import React from 'react';
import { Redirect } from 'react-router-dom';
import { flowRight, findIndex } from 'lodash';

import PrimaryHeader from './primary-header';
import WithParsedData from '../data/parsed-data';
import WithPackageData from '../data/package-data';
import Signature from '../templates/signature';
import Summary from '../templates/summary';
import Content from '../templates/content';

const SingleTemplate = props => {
	window.scrollTo(0, 0);
	const appName = props['package']['appname'];
	const typeElements = props['parsedData'][props.postType]['content'];
	const index = findIndex( typeElements, value => value.slug === props.slug );

	let element;
	if( -1 === index) {
		return ( <Redirect to={"/" + appName} /> );
	} else {
		element = typeElements[index];
	}

	let post_class = props.postType.substring(0, props.postType.length - 1);
	post_class = ('classe' === post_class ) ? 'class' : post_class;

	const strings = require('../json-files/wp-parser-json-strings.json');

	return (	
		<div id="page" className="hfeed site devhub-wrap">
			<PrimaryHeader appName={appName} postType={props.postType} strings={strings}/>
			<div id="content" className="site-content">
				<div id="content-area" className="code-reference">
					<main id="main" className="site-main" role="main">
						<article className={'wp-parser-' + post_class}>
							<Signature element={element} />
							<Summary element={element} />
							<Content element={element} />
						</article>
					</main>
				</div>
			</div>
		</div>
	)
}

export default flowRight(
	WithPackageData,
	WithParsedData,
)( SingleTemplate );