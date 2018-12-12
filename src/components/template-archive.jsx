import React from "react"
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose'

import get from "lodash/get";
import isEmpty from 'lodash/isEmpty';

import { getQueryVar, getLink, filterTypeExists } from "../data/selectors";
import WithData from "../data/with-data.jsx";
import {ArchiveFilterForm} from "./template-parts/archive-filter.jsx";
import Strings from '../json-files/wp-parser-json-strings.json';

class ArchiveTemplate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			type: '',
			version: '',
			terms: {},
			failedRequest: false,
		};

		this.handleChangeType = this.handleChangeType.bind(this);
		this.handleChangeVersion = this.handleChangeVersion.bind(this);
	}

	/**
	 * Set the state from query vars.
	 *
	 * This allows linking to an archive with a specific version and type
	 */
	setStateFromQuery() {
		const search = this.props.location.search
		const type = getQueryVar(search, 'type');

		this.setState({
			type: filterTypeExists(type) ? type : 'none',
			version: getQueryVar(search, 'since')
		});
	}

	get_versions() {
		if (!isEmpty(this.state.terms)) {
			return;
		}

		try {
			import ('../json-files/terms.json').then((data) => {
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
			this.setState({ type: 'none', version: '' });
		}

		if (('undocumented' === this.state.version) && ('none' !== this.state.type)) {
			this.setState({ type: 'none' });
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

	handleChangeType(type) {
		type = filterTypeExists(type) ? type : 'none';
		if(type !== this.state.type) {
			this.setState({ type: type });
		}
	}

	handleChangeVersion(version) {
		if(version !== this.state.version) {
			this.setState({ version: version });
		}
	}

	filterByVersion(items, version, type = 'none') {
		const allVersions = !version.length;
		const filterByType = !(type.length && ('none' === type));

		if (allVersions && !filterByType) {
			return items;
		}

		items = items.filter((item) => {
			const inTerms = (-1 !== item.terms.indexOf(version));
			const isIntroducedTerm = (-1 !== item.terms.indexOf(item.introduced));
			const isDeprecatedTerm = (-1 !== item.terms.indexOf(item.deprecated));
			const isUndocumentedTerm = (-1 !== item.terms.indexOf('undocumented'));

			switch (type) {
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
		const { postType, home } = this.props;
		const terms = get(this.state.terms, postType, {});

		// Set version if it exists.
		let version = '';
		if (!isEmpty(terms) && !isEmpty(this.state.version)) {
			version = -1 === terms.indexOf(this.state.version) ? '' : this.state.version;
		}

		const items = this.filterByVersion(this.props.content, version, this.state.type);

		return (
			<div>
				<h2>{Strings[postType]}</h2>
				{!this.state.failedRequest && !isEmpty(terms) &&
					<ArchiveFilterForm
						onChangeType={(value) => this.handleChangeType(value)}
						onChangeVersion={(value) => this.handleChangeVersion(value)}
						postType={postType}
						terms={terms}
						version={version}
						filter={this.state.type}
						postCount={items.length}
					/>
				}

				{items.map( (item, index) => {
					let deprecated = '';
					const itemLink = getLink(home, postType + '/' + item.slug);
					if(item.deprecated) {
						const deprecatedVersion = Strings['deprecated_in'].replace('%1$s', item.deprecated);
						deprecated = (<span>{' — '}<span className="deprecated-item">{deprecatedVersion}</span></span>)
					}
					return (<article key={index} className={this.props.postClass}>
					<h1><Link to={itemLink}>{item.title}</Link>{deprecated}</h1>
					<div className="description" dangerouslySetInnerHTML={{ __html: item.summary}}></div>
					<div className="sourcefile"><p>{Strings['source_file'].replace( '%1$s', item.source_file )}</p></div>
					</article>)
				  }
				)}
			</div>
		)
	}
}

export default compose(
  WithData,
  withRouter,
)(ArchiveTemplate);