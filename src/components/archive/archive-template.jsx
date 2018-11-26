import React from "react"
import { Link, withRouter } from 'react-router-dom';

import { isEmpty, get } from "lodash";

import { getQueryVar, statusExists } from "../../data/post-data";
import Strings from '../../json-files/wp-parser-json-strings.json';

class ArchiveTemplate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			status: '',
			version: '',
			terms: {},
			failedRequest: false,
		};

		this.handleChangeStatus = this.handleChangeStatus.bind(this);
		this.handleChangeVersion = this.handleChangeVersion.bind(this);
	}

	/**
	 * Set the state from query vars.
	 *
	 * This allows linking to an archive with a specific version and status
	 */
	setStateFromQuery() {
		const search = this.props.location.search
		const status = getQueryVar(search, 'status');

		this.setState({
			status: statusExists(status) ? status : 'none',
			version: getQueryVar(search, 'since')
		});
	}

	get_versions() {
		if (!isEmpty(this.state.terms)) {
			return;
		}

		try {
			import ('../../json-files/terms.json').then((data) => {
				this.setState({
					terms: data,
				});
			});
		} catch (error) {
			this.setState({
				failedRequest: true,
			});
		}
	}

	remove_query_vars() {
		// Query vars are only used when comming from a link
		const location = this.props.home + '/' + this.props.postType;
		this.props.history.replace(location);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.postType !== this.props.postType) {
			this.setState({ status: 'none', version: '' });
		}

		if (('undocumented' === this.state.version) && ('none' !== this.state.status)) {
			this.setState({ status: 'none' });
		}

		if (this.props.location.search.length) {
			this.remove_query_vars();
			return;
		}
	}

	componentDidMount() {
		this.setStateFromQuery();
		this.get_versions();
		this.remove_query_vars();
	}

	handleChangeStatus(event) {
		const status = statusExists(event.target.value) ? event.target.value : 'none';
		this.setState({ status: status });
	}

	handleChangeVersion(event) {
		this.setState({ version: event.target.value });
	}

	handleSubmit(event) {
		//alert('Your favorite flavor is: ' + this.state.status);
		event.preventDefault();
	}

	filterByVersion(items, version, status = 'none') {
		let allVersions = !version.length;
		const filterByStatus = !(status.length && ('none' === status));

		if (allVersions && !filterByStatus) {
			return items;
		}

		items = items.filter((item) => {
			const inTerms = (-1 !== item.terms.indexOf(version));
			const isIntroducedTerm = (-1 !== item.terms.indexOf(item.introduced));
			const isDeprecatedTerm = (-1 !== item.terms.indexOf(item.deprecated));
			const isUndocumentedTerm = (-1 !== item.terms.indexOf('undocumented'));

			switch (status) {
				case 'deprecated':
					return allVersions ? item.deprecated : item.deprecated === version;
				case 'introduced':
					return allVersions ? item.introduced : item.introduced === version;
				case 'modified':
					if (allVersions) {
						let termCount = item.terms.length;
						if (!termCount || isUndocumentedTerm) {
							return false;
						}

						termCount = isIntroducedTerm ? --termCount : termCount;
						termCount = isDeprecatedTerm ? --termCount : termCount;

						return 0 < termCount;
					}

					const introduced = isIntroducedTerm && (item.introduced === version);
					const deprecated = isDeprecatedTerm && (item.deprecated === version);

					return inTerms && !(introduced || deprecated);
				default:
			}

			return allVersions ? true : inTerms;
		});

		return items;
	}

	render() {
		const home = ('/' === this.props.home) ? '' : this.props.home;

		let options = '';
		let terms = get(this.state.terms, this.props.postType, {});

		// Create term options if terms found
		if (!this.state.failedRequest && !isEmpty(terms)) {
			options = this.state.terms[this.props.postType].map((version, index) =>
				<option key={index} value={version} >{'undocumented' === version ? Strings.undocumented_version : version}</option>
			);
		}


		// Set version if it exists.
		let version = '';
		if (!isEmpty(terms) && !isEmpty(this.state.version)) {
			version = -1 === terms.indexOf(this.state.version) ? '' : this.state.version;
		}

		// Title
		let title = Strings[this.props.postType];
		if (!isEmpty(version)) {
			title = Strings[this.props.postType + '_label'].replace('%1$s', this.state.version);
		}

		// Filter items by version and status
		let items = this.filterByVersion(this.props.content, version, this.state.status);

		// Found items information
		let found = '';

		let single = this.props.postType.substring(0, this.props.postType.length - 1);
		single = ('classe' === single) ? 'class' : single;
		const postType = (1 < items.length) ? this.props.postType : single;

		const isUndocumented = ('undocumented' === this.state.version);

		const versionStatus = isUndocumented ? Strings[this.state.version] : Strings[this.state.status];

		if (items.length) {
			found = Strings['status_found']
				.replace('%1$d', items.length)
				.replace('%2$s', versionStatus)
				.replace('%3$s', Strings[postType].toLowerCase());

			if ('none' === this.state.status && !isUndocumented) {
				found = Strings.found
					.replace('%1$d', items.length)
					.replace('%2$s', Strings[postType].toLowerCase());
			}
		} else {
			found = Strings.status_not_found
				.replace('%1$s', versionStatus)
				.replace('%2$s', Strings[this.props.postType].toLowerCase());
			if ('none' === this.state.status && !isUndocumented) {
				found = Strings.not_found.replace('%1$s', this.props.postType.toLowerCase());
			}
		}

		return (
			<div>
				<h2>{title}</h2>

				<form onSubmit={this.handleSubmit}>
					{!isEmpty(terms) && options.length &&
						<label>
						{Strings.filter_version}
						<select value={this.state.version} onChange={this.handleChangeVersion}>
						<option key="none" value="" >{Strings.none}</option>
						{options}
						</select>
					</label>
					}
					{ !isEmpty(terms) && !isUndocumented &&
					<label>
						{Strings.filter_status}
						<select value={this.state.status} onChange={this.handleChangeStatus}>
							<option value="none">{Strings.none}</option>
							<option value="introduced">{Strings.introduced}</option>
							<option value="modified">{Strings.modified}</option>
							<option value="deprecated">{Strings.deprecated}</option>
						</select>
					</label>
					}
				</form>

				{!items.length ? (<hr/>) : ''}
				<p>{found}</p>
				{items.length ? (<hr/>) : ''}

				{items.map( (item, index) =>
					<article key={index} className={this.props.postClass}>
					<h1><Link to={home + '/' + this.props.postType + '/' + item.slug}>{item.title}</Link></h1>
					<div className="description" dangerouslySetInnerHTML={{ __html: item.summary}}></div>
					<div className="sourcefile"><p>{Strings['source_file'].replace( '%1$s', item.source_file )}</p></div>
					</article>
				)}
			</div>
		)
	}
}

export default withRouter(ArchiveTemplate);