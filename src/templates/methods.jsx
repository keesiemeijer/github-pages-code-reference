import React from 'react';
import { Link } from 'react-router-dom';

import { isEmpty } from 'lodash';
import Strings from '../json-files/wp-parser-json-strings.json';

const Methods = props => {
	const methods = props.data[ props.element.slug ]['methods'];
	if (isEmpty(methods)) {
		return null;
	}

	const methodsHome = ('/' === props.home) ? '' : props.home;

	return (
		<div>
			<hr />
			<section className="class-methods">
			<h2>{Strings.methods}</h2>
				<ul>
				{ methods.map( (item, index) =>
					<li key={index}>
						<Link to={methodsHome + item.url}>{item.title}</Link>
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