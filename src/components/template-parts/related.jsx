import React from 'react';
import { Link } from 'react-router-dom';

import isEmpty from 'lodash/isEmpty';
import get from "lodash/get";

import Strings from '../../json-files/wp-parser-json-strings.json';

const Related = props => {
	const uses = get(props, 'data.related.uses', {});
	const usedBy = get(props, 'data.related.used_by', {});

	if (isEmpty(uses) && isEmpty(usedBy)) {
		return null;
	}

	let usesElements = '';
	if (!isEmpty(uses)) {
		usesElements = (
			<article className="uses">
				<h3>{Strings.uses}</h3>
				<ul>
					{ uses.map( (item, index) =>
						<li key={index} >
							<span>{item.source}</span>{' '}
							<Link to={props.home + item.url}>{item.text}</Link>
						</li>
					)}
			    </ul>
			</article>
		)
	}

	let usedByElements = '';
	if (!isEmpty(usedBy)) {
		usedByElements = (
			<div>
			<hr />
			<article className="used-by">
				<h3>{Strings.used_by}</h3>
				<ul>
					{ usedBy.map( (item, index) =>
						<li key={index}>
							<span>{item.source}</span>{' '}
							<Link to={props.home + item.url}>{item.text}</Link>
						</li>
					)}
			    </ul>
			</article>
			</div>
		)
	}

	return (
		<div>
		<hr />
		<section className="related">
			<h2>{Strings.related}</h2>
			{usesElements}
			{usedByElements}
		</section>
		</div>
	)
}

export default Related;