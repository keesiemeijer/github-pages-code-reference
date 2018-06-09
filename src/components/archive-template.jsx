import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { flowRight } from 'lodash';

import PrimaryHeader from './primary-header';
import WithParsedData from '../data/parsed-data';
import WithPackageData from '../data/package-data';

const ArchiveTemplate = props => {
	let appName = props['package']['appname'];

	let typeElements = props['parsedData'][props.postType]['content'];
	if( ! typeElements.length ) {
		return ( <Redirect to={"/" + appName} /> );
	}

	typeElements = typeElements.sort(function(a, b) {
	    var textA = a.title.toUpperCase();
	    var textB = b.title.toUpperCase();
	    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});

	let post_class = props.postType.substring(0, props.postType.length - 1);
	post_class = ('classe' === post_class ) ? 'class' : post_class;

	const strings = require('../json-files/wp-parser-json-strings.json');

	return (
		<div id="page" className="hfeed site devhub-wrap">
			<PrimaryHeader appName={appName} postType={props.postType} strings={strings}/>
			<div id="content" className="site-content">
				<div id="content-area" className="code-reference">
					<main id="main" className="site-main" role="main">
					<h2>{strings[ props.postType ]}</h2>
					{ typeElements.map( (item, index) =>
						<article key={index} className={ 'wp-parser-' + post_class}>
						<h1><Link to={'/' +appName + '/' + props.postType + '/' + item.slug}>{item.title}</Link></h1>
						<div className="description" dangerouslySetInnerHTML={{ __html: item.summary}}></div>
						<div className="sourcefile"><p>Source: { item.source_file }</p></div>
						</article>       
					)}
					</main>
				</div>
			</div>
		</div>		
	)
}

export default flowRight(
	WithPackageData,
	WithParsedData,
)( ArchiveTemplate );