import React from 'react';
import { Redirect } from 'react-router-dom';
import { findIndex } from 'lodash';

import PrimaryHeader from './primary-header';
import WithParsedData from '../data/parsed-data';
import Signature from '../templates/signature';
import Summary from '../templates/summary';
import Content from '../templates/content';
import Strings from '../json-files/wp-parser-json-strings.json';

const SingleTemplate = props => {
	window.scrollTo(0, 0);
	const typeElements = props['parsedData']['content'];

	if( ! typeElements.length ) {
		return ( <Redirect to={props.home} /> );
	}

	const index = findIndex( typeElements, value => value.slug === props.slug );

	let element;
	if( -1 === index) {
		return ( <Redirect to={props.home} /> );
	} else {
		element = typeElements[index];
	}

	let post_class = props.postType.substring(0, props.postType.length - 1);
	post_class = ('classe' === post_class ) ? 'class' : post_class;

	return (	
		<div id="page" className="hfeed site devhub-wrap">
			<PrimaryHeader {...props} strings={Strings}/>
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

export default WithParsedData( SingleTemplate );