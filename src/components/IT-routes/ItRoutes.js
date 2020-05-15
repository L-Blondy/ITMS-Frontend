import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Navbar, Settings, Sidebar } from './';
import { DashboardWithContext } from './dashboard';
import { TicketPageWithContext } from './ticket';
import { ModifyWithContext } from './modify';
import { LoadingPage, ErrorPage } from '../';
import { ItRoutesCtx } from './ItRoutesWithContext';
import { usePathnameChangeCallback } from '../../hooks';
import http from '../../utils/http';

function ItRoutes() {

	const itRoutesCtx = useContext(ItRoutesCtx);
	const [ key, setKey ] = useState(Math.random());
	const history = useHistory();
	usePathnameChangeCallback(() => itRoutesCtx.setInitialData(null));

	useEffect(() => {
		itRoutesCtx.setError(null);
		http()
			.get(itRoutesCtx.BASE_URL + location.pathname, location.search)
			.then(res => setTimeout(() => itRoutesCtx.setInitialData(res), 500))
			.catch(e => itRoutesCtx.setError(e));
	}, [ history.location ]);

	useEffect(() => {
		setKey(Math.random());
	}, [ itRoutesCtx.initialData ]);

	return (<>
		{ itRoutesCtx.settings.areOpened && (<Settings closeSettings={ () => itRoutesCtx.settings.setAreOpened(false) } />) }

		<Navbar />

		<Flex$>

			<Sidebar />

			<Main$>
				{ itRoutesCtx.error ? (

					<ErrorPage error={ itRoutesCtx.error } />

				) : !itRoutesCtx.initialData ? (

					<LoadingPage />

				) : itRoutesCtx.initialData ? (

					<Switch>
						<Route path='/it/dashboard' render={ () => (
							<DashboardWithContext key={ 'a' + key } initialData={ itRoutesCtx.initialData } />
						) } />
						<Route path='/it/modify/:type/:other' render={ () => itRoutesCtx.initialData.modify ?
							(
								<ModifyWithContext key={ 'b' + key } initialData={ itRoutesCtx.initialData } />
							) : (
								<LoadingPage />
							) } />
						<Route path='/it/ticket/:ticketType/:ticketId' render={ () => itRoutesCtx.initialData.id ?
							(
								<TicketPageWithContext key={ 'c' + key } initialData={ itRoutesCtx.initialData } />
							) : (
								<LoadingPage />
							)
						} />
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
