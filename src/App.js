import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import PackageData from '../package.json';
import Home from './components/home';
import Router from './components/router';

import './devhub.css';
import './index.css';

const App = (props) => {
	const appName = PackageData['reference']['app_basename'];

	let location = '/' + appName;
	location = ('/' === appName) ? '' : location;
	const homeLocation = !location ? '/' + appName : location;

	const data = {
		appName: appName,
		packageData: PackageData,
		home: homeLocation
	};

	return (
		<BrowserRouter>
			<Switch>
				<Route path={homeLocation} exact render={(props) => (<Home {...props} {...data}/>)} />
				<Route path={location + '/functions'} render={(props) => (<Router {...props} {...data} />)} />
				<Route path={location + '/classes'} render={(props) => (<Router {...props} {...data} />)} />
				<Route path={location + '/hooks'} render={(props) => (<Router {...props} {...data} />)}
				/>
				<Redirect to={homeLocation} />
			</Switch>
		</BrowserRouter>
	)
}

export default App;