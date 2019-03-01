import React, { Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';

import { postsFoundInfo } from "../../data/i18n";

import Strings from '../../json-files/wp-parser-json-strings.json';

export default function ArchiveFilterForm(props) {
	const { terms, version, postType, filter, postCount } = props;
	const isUndocumented = ('undocumented' === version);

	function handleFilterChange(e) {
		props.onChangeType(e.target.value);
	}

	function handleVersionChange(e) {
		props.onChangeVersion(e.target.value);
	}

	if (isEmpty(terms)) {
		return null;
	}

	const options = terms.map((version, index) =>
		<option key={index} value={version} >{'undocumented' === version ? Strings.undocumented_version : version}</option>
	);

	const info = postsFoundInfo(version, postType, filter, postCount);

	return (
		<Fragment>
				<form onSubmit={props.handleSubmit}>
					<label>
						{Strings.filter_by_version}
						<select value={version} onChange={handleVersionChange}>
						<option key="none" value="" >{Strings.none}</option>
						{options}
						</select>
					</label>

					{ !isUndocumented &&
						<label>
							{Strings.filter_by_type}
							<select value={filter} onChange={handleFilterChange}>
								<option value="none">{Strings.none}</option>
								<option value="introduced">{Strings.introduced}</option>
								<option value="modified">{Strings.modified}</option>
								<option value="deprecated">{Strings.deprecated}</option>
							</select>
						</label>
					}
				</form>

	{!postCount ? (<hr/>) : '' }
	<p>{info}</p> { postCount ? (<hr/>) : '' }
			</Fragment>
	);
}