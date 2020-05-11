import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Navbar, Settings, Sidebar } from './';
import { DashboardWithContext } from './dashboard';
import { TicketPageWithContext } from './ticket';
import { LoadingPage, ErrorPage } from '../';
import { ItRoutesCtx } from './ItRoutesWithContext';
import http from '../../utils/http';

function ItRoutes() {

	const it = useContext(ItRoutesCtx);
	const [ key, setKey ] = useState(Math.random());
	const history = useHistory();

	useEffect(() => {
		http()
			.get(it.BASE_URL + location.pathname, location.search)
			.then(res => setTimeout(() => it.setInitialData(res), 500))
			.catch(e => it.setError(e));
	}, [ history.location ]);

	useEffect(() => {
		setKey(Math.random());
	}, [ it.initialData ]);

	return (<>
		{ it.settings.areOpened && (<Settings closeSettings={ () => it.settings.setAreOpened(false) } />) }

		<Navbar />

		<Flex$>

			<Sidebar />

			<Main$>
				{ it.error ? (

					<ErrorPage error={ it.error } />

				) : !it.initialData ? (

					<LoadingPage />

				) : it.initialData ? (

					<Switch>
						<Route path='/it/dashboard' render={ () => (
							<DashboardWithContext key={ key } initialData={ it.initialData } />
						) } />
						<Route path='/it/:ticketType/:ticketId' render={ () => (
							<TicketPageWithContext key={ key } initialData={ it.initialData } />
						) } />
					</Switch>

				) : '' }
			</Main$>

		</Flex$>
	</>);
}

export default ItRoutes;

const Flex$ = styled.div`
	display: flex;
	flex-grow: 1;
	max-height: calc(100% - 80px);
`;

const Main$ = styled.div`
	flex-grow: 1;
	overflow-x: hidden;
	overflow-y: auto;
`;
