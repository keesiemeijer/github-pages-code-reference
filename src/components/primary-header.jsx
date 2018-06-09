import React from 'react';
import { NavLink } from 'react-router-dom';

import WithParsedData from '../data/parsed-data';
import Search from './search'

const PrimaryHeader = ( props) => {
	const location = '/' + props.appName;

	const nav = ['functions', 'hooks', 'classes'].filter( (item, index) => {
		const exists = typeof props['parsedData'][item]['content'] !== 'undefined';
		return exists && props['parsedData'][item]['content'];
	} );

	return (
	  <header className="site-header">
		<h1 className="site-title">{props.strings.page_title }</h1>
		{-1 !== nav.indexOf( props.postType ) && <Search 
			parsedData={props['parsedData'][props.postType]['content'] }
			postType={props.postType}
			appName={props.appName}
			strings={props.strings}
		/>}
		<nav>
			<NavLink to={location} exact activeClassName="active">{props.strings.home}</NavLink>
			{ nav.map( (item, index) =>
				<NavLink to={location + '/' + item} key={index} activeClassName="active">{props.strings[item]}</NavLink>
			)}
		</nav>
	  </header>
	)
}

export default WithParsedData(PrimaryHeader);