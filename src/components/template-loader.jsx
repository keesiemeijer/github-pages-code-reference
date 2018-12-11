import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import PrimaryTemplate from "./primary-template";
import WithContext from "../data/with-context.jsx";

import { isValidRouteLength, getSlug, getPostClass, homeLink } from "../data/selectors";

import ArchiveTemplate from "./template-archive.jsx";
import SingleTemplate from "./template-single.jsx";


const TemplateLoader = props => {
	console.log('teeest', props)

	// Load archive or single component

	const pathName = props.location.pathname;
	const routeIndex = props.routeIndex;
	let routePostType = props.route.postType;

	const path = homeLink( props.home, props.route.path );

	let pathPart = props.match.isExact ? 1 : 2;
	let isValidRoute = isValidRouteLength(pathName, routeIndex + pathPart);
	let slug = getSlug(pathName, pathPart);

	if (!isValidRoute && ('classes' === routePostType)) {
		++pathPart;
		isValidRoute = isValidRouteLength(pathName, routeIndex + pathPart);
		routePostType = isValidRoute ? 'methods' : routePostType;
	}

	if (!isValidRoute) {
		return (<Redirect to={props.home} />);
	}

	console.log('valid route ' + routePostType);

	if ("methods" === routePostType) {
		slug += "::" + getSlug(pathName, pathPart);
	}

	const postClass = getPostClass(routePostType);

	const page = props.match.isExact ? 'archive' : 'single';
	console.log('slug', path)

	return (
		<PrimaryTemplate {...props} postType={routePostType} page={page}>
			<Switch>
				<Route path={path} exact render={(route) => (
					<ArchiveTemplate {...props}
						postType={routePostType}
						postClass={postClass}

					/>)}
				/>
				<Route path={path + '/:slug' } render={(route) => (
					<SingleTemplate {...props}
						postType={routePostType}
						postClass={postClass}
						slug={slug}
					/>)}
				/>
			</Switch>
		</PrimaryTemplate>
	);
}

export default WithContext(TemplateLoader);