import React from 'react';
import { Link } from 'react-router-dom';

import { isEmpty } from "lodash";

import Strings from '../json-files/wp-parser-json-strings.json';

const Changelog = props => {
	const { changelog } = props.data;
	const { archiveUrl } = props;

	if (isEmpty(props.data.changelog)) {
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
						{ changelog.map( (item, index) => {
							let version = item.version;
							if(!isEmpty( archiveUrl )) {
								version = (<Link to={archiveUrl + '?since=' + version}>{version}</Link>);
							}
							return (
								<tr key={index}>
									<td>{version}</td>
									<td dangerouslySetInnerHTML={{ __html: item.description }}></td>
								</tr>
							)
						}
						) }
					</tbody>
				</table>
			</section>
		</div>
	)
}

export default Changelog;