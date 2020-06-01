import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, useHistory, NavLink } from 'react-router-dom';
import { Settings, ErrorPage } from '../';
import { DashboardPage } from '../../pages/dashboard';
import { ReportPage } from '../../pages/report';
import { ItRoutesCtx } from './ItRoutesWithContext';
import { TicketPageWithContext } from './ticket';
import { AdministrationPage } from './administration';
import { SearchPage } from './search';
import { UserCtx } from '../../GlobalContext';
import { BASE_URL } from '/BASE_URL';
import http from '../../utils/http';
import { Nav, Navbar$, Sidebar$ } from '../navs'

function ItRoutes () {

	const itRoutesCtx = useContext( ItRoutesCtx );
	const { pageSize } = useContext( UserCtx );
	const [ switchKey, setSwitchKey ] = useState( Math.random() );
	const history = useHistory();

	useEffect( () => {
		itRoutesCtx.setInitialData( null )
		itRoutesCtx.page.setIsLoading( true );
		itRoutesCtx.setError( null );

		setTimeout( () => {
			http()
				.get( BASE_URL + location.pathname, getQuery( pageSize ) )
				.then( res => {
					setSwitchKey( Math.random() );
					itRoutesCtx.page.setIsLoading( false );
					itRoutesCtx.setInitialData( res );
				} )
				.catch( e => {
					itRoutesCtx.page.setIsLoading( false );
					itRoutesCtx.setError( e );
				} );
		}, 300 );
	}, [ history.location, location.pathname ] );

	const { error, initialData } = itRoutesCtx

	return ( <>
		<Settings
			when={ itRoutesCtx.settings.areOpened }
			close={ () => itRoutesCtx.settings.setAreOpened( false ) }
		/>

		<Nav styleAs={ Navbar$ }>
			<ul>
				<li>
					<NavLink className='navlink' to='/it/dashboard'>Dashboard</NavLink>
				</li>
				<li>
					<NavLink className='navlink' to='/it/administration'>Administration</NavLink>
				</li>
				<li>
					<NavLink className='navlink' to='/it/sdfff'>Anywhere</NavLink>
				</li>

				<button className="settings" onClick={ () => itRoutesCtx.settings.setAreOpened( true ) }>Settings</button>
			</ul>
		</Nav>

		<Flex$>

			<Nav styleAs={ Sidebar$ }>
				<ul>
					<li>
						<NavLink to='/it/report'>Report</NavLink>
					</li>
					<li>
						<NavLink to='/it/ticket/incidents/new'>Open Incident</NavLink>
					</li>
					<li>
						<NavLink to='/it/ticket/requests/new'>Open Request</NavLink>
					</li>
					<li>
						<NavLink to='/it/ticket/changes/new'>Open Change</NavLink>
					</li>
					<li>
						<NavLink to='/it/administration/incidents/categories'>Incident Cat</NavLink>
					</li>
					<li>
						<NavLink to='/it/administration/requests/categories'>Request Cat</NavLink>
					</li>
					<li>
						<NavLink to='/it/administration/changes/categories'>Change Cat</NavLink>
					</li>
					<li>
						<NavLink to={ `/it/ticket/incidents` }>Incident Search </NavLink>
					</li>
					<li>
						<NavLink to={ `/it/ticket/requests` }>Request Search</NavLink>
					</li>
					<li>
						<NavLink to={ `/it/ticket/changes` }>Change Search</NavLink>
					</li>
				</ul>
			</Nav>

			<Main$ className={ itRoutesCtx.page.isLoading ? 'is-loading' : '' }>
				{ error ? (

					<ErrorPage error={ error } />

				) : initialData ? (

					<Switch key={ switchKey }>
						<Route path='/it/dashboard' render={ () => (
							<DashboardPage initialData={ initialData } />
						) } />
						<Route path='/it/report' render={ () => initialData.reportData && (
							<ReportPage initialData={ initialData.reportData } />
						) } />
						<Route path='/it/administration/:type/:other' render={ () => initialData.administrationData && (
							<AdministrationPage initialData={ initialData.administrationData } />
						) } />
						<Route path='/it/ticket/:type/:id' render={ () => initialData.id && (
							<TicketPageWithContext initialData={ initialData } />
						) } />
						<Route path='/it/ticket/:type' render={ () => initialData.searchData && (
							<SearchPage initialData={ initialData.searchData } />
						) } />
					</Switch>

				) : '' }
			</Main$>

		</Flex$>
	</> );
}

function getQuery ( searchLimit ) {
	if ( location.pathname.isOneOf( [ '/it/ticket/incidents', '/it/ticket/requests', '/it/ticket/changes' ] ) ) {
		const sortBy = localStorage.getItem( 'sortBy' );
		const sortOrder = localStorage.getItem( 'sortOrder' );
		return `?limit=${ searchLimit }&sort[sortBy]=${ sortBy }&sort[sortOrder]=${ sortOrder }`;
	}
	return location.search;
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
