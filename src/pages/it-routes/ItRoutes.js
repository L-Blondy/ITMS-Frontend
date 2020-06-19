import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Settings } from '../../components/popup';
import { ItRoutesCtx } from './ItRoutesContext';
import { CategoriesPage } from './categories';
import { DashboardPage, ReportPage, TicketPage, SearchPage } from './';
import { UsersPage, ViewUserPage } from './users';
import { GroupsPage, ViewGroupPage, NewGroupPage } from './groups';
import NewUserPage from './users/NewUserPage';
import { ErrorPage } from '../error';
import { UserCtx } from '../../GlobalContext';
import { Navbar, Sidebar } from './';
import { FlexRow$, FlexCol$ } from '../../components/flex';
import { BASE_URL } from '/BASE_URL';
import http from '../../utils/http';

function ItRoutes() {

	const itRoutesCtx = useContext(ItRoutesCtx);
	const { pageSize } = useContext(UserCtx);
	const [ switchKey, setSwitchKey ] = useState(Math.random());
	const history = useHistory();

	useEffect(() => {
		itRoutesCtx.setInitialData(null);
		itRoutesCtx.page.setIsLoading(true);
		itRoutesCtx.fetching.setError(null);

		setTimeout(() => {
			http()
				.get(BASE_URL + location.pathname, getQuery(pageSize))
				.then(res => {
					setSwitchKey(Math.random());
					itRoutesCtx.page.setIsLoading(false);
					itRoutesCtx.setInitialData(res);
				})
				.catch(e => {
					itRoutesCtx.page.setIsLoading(false);
					itRoutesCtx.fetching.setError(e);
				});
		}, 300);
	}, [ history.location, location.pathname ]);

	const { fetching, initialData } = itRoutesCtx;

	return (<>
		<Settings
			when={ itRoutesCtx.settings.areOpened }
			close={ () => itRoutesCtx.settings.setAreOpened(false) }
		/>

		<ColViewport$>
			<Navbar />

			<FlexRow$$>

				<Sidebar />

				<FlexCol$$ className={ itRoutesCtx.page.isLoading ? 'is-loading' : '' }>
					{ fetching.error ? (

						<ErrorPage error={ fetching.error } />

					) : initialData ? (

						<Switch key={ switchKey }>
							{/* USER ROUTES */ }
							<Route path='/it/users/new' render={ () => initialData.userData && initialData.userData.id && (
								<NewUserPage initialData={ initialData.userData } />
							) } />
							<Route path='/it/users/:id' render={ () => initialData.userData && initialData.userData.user && (
								<ViewUserPage initialData={ initialData.userData } />
							) } />
							<Route path='/it/users' render={ () => initialData.userData && initialData.userData.users && (
								<UsersPage initialData={ initialData.userData } />
							) } />
							{/* GROUP ROUTES */ }
							<Route path='/it/groups/new' render={ () => initialData.groupData && initialData.groupData && (
								<NewGroupPage initialData={ initialData.groupData } />
							) } />
							<Route path='/it/groups/:id' render={ () => initialData.groupData && initialData.groupData.group && (
								<ViewGroupPage initialData={ initialData.groupData } />
							) } />
							<Route path='/it/groups' render={ () => initialData.groupData && initialData.groupData.groups && (
								<GroupsPage initialData={ initialData.groupData } />
							) } />
							{/* OTHER ROUTES */ }
							<Route path='/it/categories/:type' render={ () => initialData.categoriesData && (
								<CategoriesPage categories={ initialData.categoriesData } />
							) } />
							<Route path='/it/dashboard' render={ () => (
								<DashboardPage initialData={ initialData } />
							) } />
							<Route path='/it/report' render={ () => initialData.reportData && (
								<ReportPage initialData={ initialData.reportData } />
							) } />
							<Route path='/it/ticket/:type/:id' render={ () => initialData.id && (
								<TicketPage initialData={ initialData } />
							) } />
							<Route path='/it/ticket/:type' render={ () => initialData.searchData && (
								<SearchPage initialData={ initialData.searchData } />
							) } />
						</Switch>

					) : '' }
				</FlexCol$$>
			</FlexRow$$>
		</ColViewport$>
	</>);
}

function getQuery(searchLimit) {
	if (location.pathname.isOneOf([ '/it/ticket/incidents', '/it/ticket/requests', '/it/ticket/changes' ])) {
		const sortBy = localStorage.getItem('sortBy');
		const sortOrder = localStorage.getItem('sortOrder');
		return `?limit=${ searchLimit }&sort[sortBy]=${ sortBy }&sort[sortOrder]=${ sortOrder }`;
	}
	return location.search;
}

export default ItRoutes;

const ColViewport$ = styled(FlexCol$)`
	height: 100%;
`;

const FlexRow$$ = styled(FlexRow$)`
	height: calc(100% - 80px);
	width: 100vw;
`;

const FlexCol$$ = styled(FlexCol$)`
	flex-grow: 1;
	height: 100%;
	max-width: calc(100% - 200px);
`;
