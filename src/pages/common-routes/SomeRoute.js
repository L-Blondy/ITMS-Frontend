import React from 'react';
import { NavLink } from 'react-router-dom';

function SomeRoute() {
	return (<>
		<h1>
			SomeRoute
		</h1>
		<NavLink to='/it/dashboard'>dashboard</NavLink>
	</>);
}

export default SomeRoute;
