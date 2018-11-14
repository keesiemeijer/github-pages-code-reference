import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import Search from './search'
import withData from '../json-files/with-data.json';

const PrimaryHeader = (props) => {
	let searchPostType = props.postType;
	searchPostType = ('methods' === searchPostType) ? 'classes' : searchPostType;

	const { parsed_name, parsed_version } = props.packageData
	const { request } = props;

	let title = props.strings.page_title
	if (parsed_name.length) {
		title = parsed_name;
		title += parsed_version.length ? ' ' + parsed_version : '';
		if ('home' !== request) {
			title = (<Link to={props.home}>{title}</Link>);
		}
	}

	const archiveHome = ('/' === props.home) ? '' : props.home;

	return (
		<header className="site-header">
			<h1 className="site-title">{title}</h1>
			{-1 !== withData.indexOf( searchPostType ) && <Search
				postType={searchPostType}
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