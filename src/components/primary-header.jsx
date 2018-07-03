import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import Search from './search'
import withData from '../json-files/with-data.json';

const PrimaryHeader = (props) => {
	let searchPostType = props.postType;
	let searchData = props.state[searchPostType];

	if (!isEmpty(props.searchData) && ('methods' === props.postType)) {
		searchPostType = 'classes';
		searchData = props.searchData
	}

	const { parsed_name, parsed_version } = props.packageData.reference
	const { isHome } = props;

	let title = props.strings.page_title
	if (parsed_name.length) {
		title = parsed_name;
		title += parsed_version.length ? ' ' + parsed_version : '';
		if (!isHome) {
			title = (<Link to={props.home}>{title}</Link>);
		}
	}

	const archiveHome = ('/' === props.home) ? '' : props.home;

	return (
		<header className="site-header">
			<h1 className="site-title">{title}</h1>
			{-1 !== withData.indexOf( searchPostType ) && <Search
				postType={searchPostType}
				searchData={searchData}
				strings={props.strings}
				home={archiveHome}
			/>}
			<nav>
				<NavLink to={props.home} exact activeClassName="active">{props.strings.home}</NavLink>
				{ withData.map( (item, index) =>
					'methods' !== item && <NavLink to={archiveHome + '/' + item} key={index} activeClassName="active">{props.strings[item]}</NavLink>
				)}
			</nav>
	  </header>
	)
}

export default PrimaryHeader;