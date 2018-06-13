import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Single from './single';
import ArchivePaged from './archive-paged';
import Archive from './archive';

const Router = props => {
	return ( 	
		<Switch>
			<Route path={props.match.path} exact render={ (route) => (<Archive {...props} /> ) } />
			<Route path={`${props.match.path}/page/:page(\\d+)`} component={ArchivePaged} />
			<Route path={`${props.match.path}/:slug` } render={(route) => (<Single {...props}/>)} />
		</Switch>	
	)
}

export default Router;