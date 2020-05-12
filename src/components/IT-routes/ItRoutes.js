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

	const itCtx = useContext(ItRoutesCtx);
	const [ key, setKey ] = useState(Math.random());
	const history = useHistory();

	useEffect(() => {
		itCtx.setError(null);
		http()
			.get(itCtx.BASE_URL + location.pathname, location.search)
			.then(res => setTimeout(() => itCtx.setInitialData(res), 500))
			.catch(e => itCtx.setError(e));
	}, [ history.location ]);

	useEffect(() => {
		setKey(Math.random());
	}, [ itCtx.initialData ]);

	return (<>
		{ itCtx.settings.areOpened && (<Settings closeSettings={ () => itCtx.settings.setAreOpened(false) } />) }

		<Navbar />

		<Flex$>

			<Sidebar />

			<Main$>
				{ itCtx.error ? (

					<ErrorPage error={ itCtx.error } />

				) : !itCtx.initialData ? (

					<LoadingPage />

				) : itCtx.initialData ? (

					<Switch>
						<Route path='/it/dashboard' render={ () => (
							<DashboardWithContext key={ key } initialData={ itCtx.initialData } />
						) } />
						<Route path='/it/ticket/:ticketType/:ticketId' render={ () => (
							<TicketPageWithContext key={ key } initialData={ itCtx.initialData } />
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
	/* overflow-x: hidden;
	overflow-y: auto; */
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;
