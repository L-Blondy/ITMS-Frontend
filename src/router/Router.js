import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SomeRoute } from '../pages/common-routes';
import {
	CategoriesPage,
	DashboardPage,
	ReportPage,
	TicketPage,
	SearchPage,
	UsersPage,
	ViewUserPage,
	NewUserPage,
	GroupsPage,
	ViewGroupPage,
	NewGroupPage
} from '../pages/it-routes';
import { ItLayout, CommonLayout } from '../components/layouts';

function Router() {

	return (
		<BrowserRouter>
			<Switch>
				<Route path='/it' render={ () => <ItRoutes /> } />
				<Route path='/' render={ () => <CommonRouter /> } />
			</Switch>
		</BrowserRouter>
	);
}

function ItRoutes() {

	return (
		<ItLayout>
			<Switch>
				{/* USER ROUTES */ }
				<Route path='/it/users/new' component={ NewUserPage } />
				<Route path='/it/users/:id' component={ ViewUserPage } />
				<Route path='/it/users' component={ UsersPage } />
				{/* GROUP ROUTES */ }
				<Route path='/it/groups/new' component={ NewGroupPage } />
				<Route path='/it/groups/:id' component={ ViewGroupPage } />
				<Route path='/it/groups' component={ GroupsPage } />
				{/* OTHER ROUTES */ }
				<Route path='/it/categories/:type' component={ CategoriesPage } />
				<Route path='/it/dashboard' component={ DashboardPage } />
				<Route path='/it/report' component={ ReportPage } />
				<Route path='/it/ticket/:type/:id' component={ TicketPage } />
				<Route path='/it/ticket/:type' component={ SearchPage } />
			</Switch>
		</ItLayout>
	);
}

function CommonRouter() {
	return (
		<CommonLayout>
			<Switch>
				<Route path='/' component={ SomeRoute } />
			</Switch>
		</CommonLayout>
	);
}


export default Router;