import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Categories } from './categories';
import NewUserPage from './users/NewUserPage';
import ManageUserPage from './users/ManageUserPage';

function AdministrationRoutes({ initialData }) {

	return (
		<Switch>
			<Route exact path='/it/administration/users/new' render={ () => <NewUserPage initialData={ initialData } /> } />
			<Route exact path='/it/administration/users/:id' render={ () => <ManageUserPage initialData={ initialData } /> } />
			<Route path='/it/administration/users/:id' render={ () => <Users /> } />
			<Route path='/it/administration/categories/:type' render={ () => <Categories categories={ initialData } /> } />
		</Switch>
	);
}

export default AdministrationRoutes;
