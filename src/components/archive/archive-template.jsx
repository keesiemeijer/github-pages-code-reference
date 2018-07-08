import React from "react"
import { Link } from 'react-router-dom';

import Strings from '../../json-files/wp-parser-json-strings.json';

const ArchiveTemplate = props => {

	const postTypeHome = ('/' === props.home) ? '' : props.home;

	return (
		<div>
		<h2>{Strings[ props.postType ]}</h2>
			{props.content.map( (item, index) =>
				<article key={index} className={props.postClass}>
				<h1><Link to={postTypeHome + '/' + props.postType + '/' + item.slug}>{item.title}</Link></h1>
				<div className="description" dangerouslySetInnerHTML={{ __html: item.summary}}></div>
				<div className="sourcefile"><p>{Strings['source_file'].replace( '%1$s', item.source_file )}</p></div>
				</article>
			)}
		</div>
	)
}

export default ArchiveTemplate;