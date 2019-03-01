import React from "react"
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose'

import get from "lodash/get";
import isEmpty from 'lodash/isEmpty';
import trim from "lodash/trim";

import { getQueryVar, queryVarExists, getLink, getPostTypeSingle } from "../data/selectors";
import { filterArchiveItems, filterTypeExists } from "../data/filter-archive.jsx";
import { filterSearchItems } from "../data/filter-search";
import { postsFoundInfo } from "../data/i18n";


import WithData from "../data/with-data.jsx";
import ArchiveFilterForm from "./template-parts/archive-filter.jsx";
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
		const state = this.getStateFromQuery();
		this.setState(state);
	}

	getStateFromQuery() {
		const queryString = this.props.location.search;
		const type = getQueryVar(queryString, 'type');
		const isSearch = this.isSearch();

		return {
			type: !isSearch && filterTypeExists(type) ? type : '',
			version: !isSearch ? getQueryVar(queryString, 'since') : '',
		};
	}

	isSearch() {
		const queryString = this.props.location.search;
		return queryVarExists(queryString, 'search');
	}

	getSearch() {
		const queryString = this.props.location.search;
		const search = getQueryVar(queryString, 'search').replace(/\++/g, ' ');
		return search.toLowerCase();
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

	update_query_string() {
		const location = this.props.home + '/' + this.props.postType;
		const type = filterTypeExists(this.state.type) ? this.state.type : '';
		const queryString = this.props.location.search;

		let query = this.state['version'].length ? 'since=' + this.state.version + '&' : '';
		query += type.length ? 'type=' + type + '&' : '';

		if (this.isSearch()) {
			const search = getQueryVar(queryString, 'search');
			query = 'search=' + search
		}

		query = query.replace(/\s+/g, '+');
		if (!query.length && !queryString) {
			return;
		}

		query = '?' + trim(query, ' &');
		if (query.length && queryString !== query) {
			this.props.history.push(location + query);

			this.props.history.replace({
				pathname: this.props.location.pathname,
				search: query,
				state: this.state,
			})
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const isVersionChange = (prevState.version !== this.state.version);
		const isTypeChange = (prevState.type !== this.state.type)

		if (isVersionChange || isTypeChange) {
			this.update_query_string();
			return;
		}

		const queryState = this.getStateFromQuery();
		const isQueryVersionChange = (queryState.version !== this.state.version);
		const isQueryTypeChange = (queryState.type !== this.state.type)

		if (isQueryVersionChange || isQueryTypeChange) {
			this.setState(queryState);
			return;
		}
	}

	componentDidMount() {
		this.setStateFromQuery();
		this.get_versions();
	}

	handleChangeType(type) {
		type = filterTypeExists(type) ? type : '';
		if (type !== this.state.type) {
			this.setState({ type: type });
		}
	}

	handleChangeVersion(version) {
		if (version !== this.state.version) {
			this.setState({ version: version });
		}
	}

	render() {
		const { postType, home, content } = this.props;
		const terms = get(this.state.terms, postType, {});
		const postTypeSingle = getPostTypeSingle(postType);
		const isSearch = this.isSearch();
		let title = Strings[postType];
		let items = [];
		let search = '';
		let version = '';
		let searchInfo = '';

		// Set version if it exists.
		if (!isEmpty(terms) && !isEmpty(this.state.version)) {
			version = -1 === terms.indexOf(this.state.version) ? '' : this.state.version;
		}

		// Filter items if needed.
		if (isSearch) {
			title = "Search Results";
			search = this.getSearch();
			items = filterSearchItems(content, search);
			searchInfo = postsFoundInfo('', postType, '', items.length);
		} else {
			items = filterArchiveItems(content, version, this.state.type);
		}

		return (
			<div>
				<h2>{title}</h2>
				{isSearch ? (<p>Search results for {postTypeSingle}: {search}</p>) : ''}
				{isSearch && !items.length ? (<hr/>) : ''}
				{isSearch ? (<p>{searchInfo}</p>) : ''}
				{isSearch && items.length ? (<hr/>) : ''}

				{!this.isSearch() && !this.state.failedRequest && !isEmpty(terms) &&
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