import React from 'react';
import { isEmpty } from 'lodash';

import Strings from '../json-files/wp-parser-json-strings.json';

const Changelog = props => {
	const key = props.element.slug + '-' + props.element['line_num'];
	const changelog = props.data[ key ]['changelog'];
	if (isEmpty(changelog)) {
		return null;
	}

	return (
		<div>
			<hr />
			<section className="changelog">
				<h3>{Strings.changelog}</h3>
				<table>
					<caption className="screen-reader-text">{Strings.changelog}</caption>
					<thead>
						<tr>
							<th className="changelog-version">{Strings.version}</th>
							<th className="changelog-desc">{Strings.description}</th>
						</tr>
					</thead>
					<tbody>
						{ changelog.map( (item, index) =>
						<tr key={index}>
							<td>{item.version}</td>
							<td dangerouslySetInnerHTML={{ __html: item.description }}></td>
						</tr>
						) }			
					</tbody>
				</table>
			</section>
		</div>
	)
}

export default Changelog;