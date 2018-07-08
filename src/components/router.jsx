import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Single from "./single/";
import Archive from "./archive/";

const Router = props => {
	return (
		<Switch>
			<Route path={props.match.path} exact render={(route) => (<Archive {...props}/>)} />
			<Route path={`${props.match.path}/:slug` } render={(route) => (<Single {...props}/>)} />
		</Switch>
	)
}

export default Router;