import React from 'react';
import { NavLink } from 'react-router-dom';

function CommonRoutes() {
	return (<>
		<h1>
			COMMON ROUTES
		</h1>
		<NavLink to='/it/dashboard'>dashboard</NavLink>
	</>);
}

export default CommonRoutes;
