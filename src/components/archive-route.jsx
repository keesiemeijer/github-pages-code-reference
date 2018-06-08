import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Single from './single';
import ArchivePaged from './archive-paged';
import Archive from './archive';

const ArchiveRoute = props => {
	return ( 	
		<Switch>
			<Route path={props.match.path} exact component={Archive} />
			<Route path={`${props.match.path}/page/:page(\\d+)`} component={ArchivePaged} />
			<Route path={`${props.match.path}/:slug` } component={Single } />
		</Switch>	
	)
}

export default ArchiveRoute;