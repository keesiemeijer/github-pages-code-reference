import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import Search from './search'

const PrimaryHeader = ( props) => {
	let searchPostType = props.postType;
	let searchData     = props.parsedData;
	if ( ! isEmpty( props.searchData ) && ( 'methods' === props.postType ) ) {
		searchPostType = 'classes';
		searchData = props.searchData
	}

	const reference = props.packageData.reference;
	let title = props.strings.page_title
	const {isHome} = props;
	if( reference.parsed_name.length ) {
		title = reference.parsed_name;
		if( !isHome) {
			title = (<Link to={props.home}>{reference.parsed_name}</Link>);
		}

	}


	return (
	  <header className="site-header">
		<h1 className="site-title">{title}</h1>
		{-1 !== props.withData.indexOf( searchPostType ) && <Search
			postType={searchPostType}
			searchData={searchData}
			strings={props.strings}
			home={props.home}
		/>}
		<nav>
			<NavLink to={props.home} exact activeClassName="active">{props.strings.home}</NavLink>
			{ props.withData.map( (item, index) =>
				'methods' !== item && <NavLink to={props.home + '/' + item} key={index} activeClassName="active">{props.strings[item]}</NavLink>
			)}
		</nav>
	  </header>
	)
}

export default PrimaryHeader;