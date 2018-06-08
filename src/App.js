import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import WithPackageData from './data/package-data';
import Home from './components/home';
import ArchiveRoute from './components/archive-route';

import './devhub.css';
import './index.css';

const App = (props) => {
	const appName = '/' + props['package']['appname'];

	return (
		<BrowserRouter>
			<Switch>
				<Route path={appName} exact component={Home} />
				<Route path={appName + '/functions'} component={ArchiveRoute} />
				<Route path={appName + '/classes'} component={ArchiveRoute} />
				<Route path={appName + '/hooks'} component={ArchiveRoute} />
				<Redirect to={appName} />
			</Switch>
		</BrowserRouter>
	)
}

export default WithPackageData( App );