import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Navbar, Settings, Sidebar } from './';
import { ErrorPage } from '../';
import { DashboardWithContext } from './dashboard';
import { ItRoutesCtx } from './ItRoutesWithContext';
import { TicketPageWithContext } from './ticket';
import { AdministrationPage } from './administration';
import { SearchPage } from './search';
import { usePathnameChangeCallback } from '../../hooks';
import http from '../../utils/http';
import { BASE_URL } from '/BASE_URL';

function ItRoutes() {

	const itRoutesCtx = useContext(ItRoutesCtx);
	const [ key, setKey ] = useState(Math.random());
	const history = useHistory();
	usePathnameChangeCallback(() => itRoutesCtx.setInitialData(null));

	useEffect(() => {
		itRoutesCtx.page.setIsLoading(true);
		itRoutesCtx.setError(null);
		setTimeout(() => {
			http()
				.get(BASE_URL + location.pathname, location.search)
				.then(res => {
					itRoutesCtx.setInitialData(res);
				})
				.catch(e => {
					itRoutesCtx.page.setIsLoading(false);
					itRoutesCtx.setError(e);
				});
		}, 300);

	}, [ history.location ]);

	useEffect(() => {
		setKey(Math.random());
		itRoutesCtx.initialData && itRoutesCtx.page.setIsLoading(false);
	}, [ itRoutesCtx.initialData ]);

	return (<>
		{ itRoutesCtx.settings.areOpened && (<Settings closeSettings={ () => itRoutesCtx.settings.setAreOpened(false) } />) }

		<Navbar />

		<Flex$>

			<Sidebar />

			<Main$ className={ itRoutesCtx.page.isLoading ? 'is-loading' : '' }>
				{ itRoutesCtx.error ? (

					<ErrorPage error={ itRoutesCtx.error } />

				) : itRoutesCtx.initialData ? (

					<Switch>
						<Route path='/it/dashboard' render={ () => (
							<DashboardWithContext key={ 'a' + key } initialData={ itRoutesCtx.initialData } />
						) } />
						<Route path='/it/administration/:type/:other' render={ () => itRoutesCtx.initialData.administrationData && (
							<AdministrationPage key={ 'b' + key } initialData={ itRoutesCtx.initialData } />
						) } />
						<Route path='/it/ticket/:type/:id' render={ () => itRoutesCtx.initialData.id && (
							<TicketPageWithContext key={ 'c' + key } initialData={ itRoutesCtx.initialData } />
						) } />
						<Route path='/it/ticket/:type' render={ () => itRoutesCtx.initialData.searchData && (
							<SearchPage key={ 'd' + key } initialData={ itRoutesCtx.initialData.searchData } />
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
	max-width: 100vw;
	overflow: hidden;
`;

const Main$ = styled.div`
	flex-grow: 1;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;
