import styled from 'styled-components';
import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Settings } from '../../components/popup';
import { ItRoutesCtx } from './ItRoutesContext';
import { CategoriesPage } from './categories';
import { DashboardPage, ReportPage, TicketPage, SearchPage } from './';
import { UsersPage, ViewUserPage } from './users';
import { GroupsPage, ViewGroupPage, NewGroupPage } from './groups';
import NewUserPage from './users/NewUserPage';
import { Navbar, Sidebar } from './';
import { FlexRow$, FlexCol$ } from '../../components/flex';

function ItRoutes() {

	const itRoutesCtx = useContext(ItRoutesCtx);

	return (<>
		<Settings
			when={ itRoutesCtx.settings.areOpened }
			close={ () => itRoutesCtx.settings.setAreOpened(false) }
		/>

		<ColViewport$>
			<Navbar />

			<FlexRow$$>

				<Sidebar />

				<Switch>
					{/* USER ROUTES */ }
					<Route path='/it/users/new' render={ () => <NewUserPage /> } />
					<Route path='/it/users/:id' render={ () => <ViewUserPage /> } />
					<Route path='/it/users' render={ () => <UsersPage /> } />
					{/* GROUP ROUTES */ }
					<Route path='/it/groups/new' render={ () => <NewGroupPage /> } />
					<Route path='/it/groups/:id' render={ () => <ViewGroupPage /> } />
					<Route path='/it/groups' render={ () => <GroupsPage /> } />
					{/* OTHER ROUTES */ }
					<Route path='/it/categories/:type' render={ () => <CategoriesPage /> } />
					<Route path='/it/dashboard' render={ () => <DashboardPage /> } />
					<Route path='/it/report' render={ () => <ReportPage /> } />
					<Route path='/it/ticket/:type/:id' render={ () => <TicketPage /> } />
					<Route path='/it/ticket/:type' render={ () => <SearchPage /> } />
				</Switch>

			</FlexRow$$>
		</ColViewport$>
	</>);
}

export default ItRoutes;

const ColViewport$ = styled(FlexCol$)`
	height: 100%;
`;

const FlexRow$$ = styled(FlexRow$)`
	height: calc(100% - 80px);
	width: 100vw;
	max-width: 100vw;
`;
