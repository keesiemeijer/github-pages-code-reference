import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import Search from './search'
import withData from '../json-files/with-data.json';
import { DataContext } from "../contexts/DataContext";


const PrimaryHeader = (props) => {
	let searchPostType = props.postType;
	searchPostType = ('methods' === searchPostType) ? 'classes' : searchPostType;

	const { parsed_name, parsed_version, app_description } = props.packageData
	const { page } = props;

	let title = props.strings.page_title
	if (parsed_name.length) {
		title = parsed_name;
		title += parsed_version.length ? ' ' + parsed_version : '';
		if ('home' !== page) {
			title = (<Link to={props.home}>{title}</Link>);
		}
	}

	let desc = '';
	if (app_description.length) {
		desc = (<p className="site-description">{app_description}</p>);
	}

	const archiveHome = ('/' === props.home) ? '' : props.home;

	return (
		<header className="site-header">
			<h1 className="site-title">{title}</h1>
			{desc}
			{-1 !== withData.indexOf( searchPostType ) &&
			<DataContext.Consumer>
				{
					({ postType, postTypeData, fetchData }) => (
						<Search {...props}
							postType={searchPostType}
							postTypeData={postTypeData}
							fetchData={fetchData}
							strings={props.strings}
							home={archiveHome}
						/>
					)
				}
			</DataContext.Consumer>
			}
			<nav>
				<NavLink to={props.home} exact activeClassName="active">{props.strings.home}</NavLink>
				{ withData.map( (item, index) =>
					'methods' !== item && <NavLink to={archiveHome + '/' + item } key={index} activeClassName="active">{props.strings[item]}</NavLink>
				)}
			</nav>
	  </header>
	)
}

export default PrimaryHeader;