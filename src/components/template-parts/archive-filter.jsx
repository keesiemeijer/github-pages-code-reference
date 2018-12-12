import React, {Fragment} from 'react';
import isEmpty from 'lodash/isEmpty';

import { postsFoundInfo } from "../../data/i18n";

import Strings from '../../json-files/wp-parser-json-strings.json';

export class ArchiveFilterForm extends React.Component {

	onChangeVersion( event ) {
		this.props.onChangeVersion(event.target.value);
	}

	onChangeType(event) {
		this.props.onChangeType(event.target.value);
	}

	render() {
		const { terms, version, postType, filter, postCount } = this.props;
		const isUndocumented = ('undocumented' === version);

		if(isEmpty(terms)) {
			return null;
		}

		const options = terms.map((version, index) =>
			<option key={index} value={version} >{'undocumented' === version ? Strings.undocumented_version : version}</option>
		);
		
		const info = postsFoundInfo(version, postType, filter, postCount);

		return (
			<Fragment>
				<form onSubmit={this.props.handleSubmit}>			
					<label>
						{Strings.filter_by_version}
						<select value={version} onChange={
							this.onChangeVersion.bind(this)}>
						<option key="none" value="" >{Strings.none}</option>
						{options}
						</select>
					</label>

					{ !isUndocumented &&
						<label>
							{Strings.filter_by_type}
							<select value={this.props.filter} onChange={
								this.onChangeType.bind(this)}>
								<option value="none">{Strings.none}</option>
								<option value="introduced">{Strings.introduced}</option>
								<option value="modified">{Strings.modified}</option>
								<option value="deprecated">{Strings.deprecated}</option>
							</select>
						</label>
					}
				</form>

				{!postCount ? (<hr/>) : ''}
				<p>{info}</p>
				{postCount ? (<hr/>) : ''}
			</Fragment>
		)
	}
}

export default ArchiveFilterForm;