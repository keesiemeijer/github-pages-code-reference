import React from 'react';
import { NavLink } from 'react-router-dom';

import WithParsedData from '../data/parsed-data';
import Search from './search'

const PrimaryHeader = ( props) => {
	const location = '/' + props.appName;

	return (
	  <header className="site-header">
		<h1 className="site-title">{props.strings.page_title }</h1>
		<Search 
			parsedData={props['parsedData'][props.postType]['content'] }
			postType={props.postType}
			appName={props.appName}
			strings={props.strings}
		/>
		<nav>
			<NavLink to={location} exact activeClassName="active">{props.strings.home}</NavLink>
			<NavLink to={location + '/functions'}  activeClassName="active">{props.strings.functions}</NavLink>
			<NavLink to={location + '/classes'} activeClassName="active">{props.strings.classes}</NavLink>
			<NavLink to={location + '/hooks'} activeClassName="active">{props.strings.hooks}</NavLink>
		</nav>
	  </header>
	)
}

export default WithParsedData(PrimaryHeader);