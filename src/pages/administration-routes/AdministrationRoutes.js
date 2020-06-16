import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Categories, Users, NewUserPage } from '.';

function AdministrationRoutes({ initialData }) {

	console.log(initialData);

	return (
		<Switch>
			<Route exact path='/it/administration/user/new' render={ () => <NewUserPage /> } />
			<Route path='/it/administration/user/:id' render={ () => <Users /> } />
			<Route path='/it/administration/categories/:type' render={ () => <Categories categories={ initialData } /> } />
		</Switch>
	);
}

export default AdministrationRoutes;
