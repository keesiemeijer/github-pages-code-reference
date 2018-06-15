import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import WithParsedData from '../data/parsed-data';
import { getPostClass } from "../data/post-type-data";
import Strings from '../json-files/wp-parser-json-strings.json';
import PrimaryTemplate from "./primary-template";

const ArchiveTemplate = props => {
	let typeElements = props['parsedData']['content'];
	if (!typeElements.length) {
		return (<Redirect to={props.home} />);
	}

	typeElements = typeElements.sort(function(a, b) {
		var textA = a.title.toUpperCase();
		var textB = b.title.toUpperCase();
		return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});

	let postClass = getPostClass( props.postType );

	return (
		<PrimaryTemplate {...props}>
			<h2>{Strings[ props.postType ]}</h2>
			{typeElements.map( (item, index) =>
				<article key={index} className={postClass}>
				<h1><Link to={props.home + '/' + props.postType + '/' + item.slug}>{item.title}</Link></h1>
				<div className="description" dangerouslySetInnerHTML={{ __html: item.summary}}></div>
				<div className="sourcefile"><p>{Strings['source_file'].replace( '%1$s', item.source_file )}</p></div>
				</article>
			)}
		</PrimaryTemplate>
	)
}

export default WithParsedData(ArchiveTemplate);