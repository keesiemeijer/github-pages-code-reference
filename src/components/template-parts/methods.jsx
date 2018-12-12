import React from 'react';
import { Link } from 'react-router-dom';

import Strings from '../../json-files/wp-parser-json-strings.json';
import {getLink} from '../../data/selectors';


const Methods = props => {
	if (!props.data.hasOwnProperty('methods')) {
		return null;
	}

	return (
		<div>
			<hr />
			<section className="class-methods">
			<h2>{Strings.methods}</h2>
				<ul>
				{ props.data.methods.map( (item, index) =>
					<li key={index}>
						<Link to={getLink(props.home, item.url)}>{item.title}</Link>
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