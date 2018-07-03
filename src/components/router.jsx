import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import LoadComponent from "./load-component";

const Single = Loadable({
	loader: () =>
		import ('./single/'),
	loading: LoadComponent,
	delay: 500,
});

const Archive = Loadable({
	loader: () =>
		import ('./archive/'),
	loading: LoadComponent,
	delay: 500,
});

const Router = props => {
	return (
		<Switch>
			<Route path={props.match.path} exact render={(route) => (<Archive {...props}/>)} />
			<Route path={`${props.match.path}/:slug` } render={(route) => (<Single {...props}/>)} />
		</Switch>
	)
}

export default Router;