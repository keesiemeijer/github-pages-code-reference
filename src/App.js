import React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import trim from "lodash/trim";

import routes from "./data/routes.js";
import { DoRoute } from './components/route.jsx';
import referenceData from "./json-files/reference.json";

import "./devhub.css";
import "./index.css";

const App = props => {
	const appName = referenceData["app_basename"];

	let location = trim("/" + appName);

	const data = {
		appName: appName,
		referenceData: referenceData,
		home: location,
		routeIndex: "/" === location ? 0 : 1
	};

	return (
		<BrowserRouter>
			<Switch>
				{routes.map(
					(route) => {						
						return DoRoute(route, data);
					}
				)}
				<Redirect to={data['home']} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;