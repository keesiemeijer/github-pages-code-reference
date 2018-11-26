import React from 'react';
import { Link } from 'react-router-dom';

import Strings from '../json-files/wp-parser-json-strings.json';

const Methods = props => {
	const home = ('/' === props.home) ? '' : props.home;

	if (!props.data.hasOwnProperty('methods')) {
		return null;
	}

	const methods = props.data.methods;

	return (
		<div>
			<hr />
			<section className="class-methods">
			<h2>{Strings.methods}</h2>
				<ul>
				{ methods.map( (item, index) =>
					<li key={index}>
						<Link to={home + item.url}>{item.title}</Link>
						{' — '}
						<div className="class-methods-excerpt" dangerouslySetInnerHTML={{ __html: item.excerpt }}></div>			
					</li>		
				) }
				</ul>	
			</section>
		</div>
	)

}

export default Methods;