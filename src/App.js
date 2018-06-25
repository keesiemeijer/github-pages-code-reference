import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { trim } from 'lodash';

import PackageData from '../package.json';
import LoadComponent from "./components/load-component";

import './devhub.css';
import './index.css';

const Home = Loadable({
	loader: () =>
		import ('./components/home'),
	loading: LoadComponent,
	delay: 500,
});

const Router = Loadable({
	loader: () =>
		import ('./components/router'),
	loading: LoadComponent,
	delay: 500,
});


const App = (props) => {
	const appName = PackageData['reference']['app_basename'];

	let location = trim('/' + appName);

	const data = {
		appName: appName,
		packageData: PackageData,
		home: location,
		postTypeIndex: ('/' === location) ? 0 : 1,
	};

	location = ('/' === location) ? '' : location;

	return (
		<BrowserRouter>
			<Switch>
				<Route path={data['home']} exact render={(props) => (<Home {...props} {...data}/>)} />
				<Route path={location + '/functions'} render={(props) => (<Router {...props} {...data} />)} />
				<Route path={location + '/classes'} render={(props) => (<Router {...props} {...data} />)} />
				<Route path={location + '/hooks'} render={(props) => (<Router {...props} {...data} />)}
				/>
				<Redirect to={data['home']} />
			</Switch>
		</BrowserRouter>
	)
}

export default App;