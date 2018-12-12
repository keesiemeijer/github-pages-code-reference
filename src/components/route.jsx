import React from "react";
import { Route } from "react-router-dom";

import withData from "../json-files/with-data.json";
import { getLink } from "../data/selectors";

export const DoRoute = (route, data) => {
	const path = getLink(data.home, route.path);

	// Check if parsed post type has content
	if (!(data.home === path || -1 !== withData.indexOf(route.postType))) {
		return null;
	}

	let Component = route.component;

	return (
		<Route
			path={path}
			key={path}
			exact={route.exact}
			render={props => {
				return (
					<Component
						{...props}
						{...data}
						postType={route.postType}
						route={route}
					/>
				);
			}}
		/>
	);
};
