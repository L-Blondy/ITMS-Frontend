import React, { useState } from 'react';
import { BrowserRouter, NavLink, Link, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Dashboard, Settings } from './components';
import { TicketGet } from './components/ticket';
import { TicketCtx } from './components/ticket/TicketContext';

function App() {

	const [ openSettings, setOpenSettings ] = useState(false);

	return (
		<BrowserRouter>
			<Navbar$ className='navbar'>
				<NavLink className='navlink' to='/dashboard'>Dashboard</NavLink>
				<NavLink className='navlink' to='/sdf'>Somewhere</NavLink>
				<NavLink className='navlink' to='/sdfff'>Anywhere</NavLink>

				<button className="settings" onClick={ () => setOpenSettings(true) }>Settings</button>
			</Navbar$>

			{ openSettings && (<Settings closeSettings={ () => setOpenSettings(false) } />) }

			<Sidebar$ className='sidebar'>
				<Link to='/ticket/new?type=INC'>Open Incident</Link>
				<Link to='/ticket/new?type=REQ'>Open Request</Link>
				<Link to='/ticket/new?type=CHG'>Open Change</Link>
			</Sidebar$>

			<Main$>
				<Switch>
					<Route path='/dashboard' render={ () => <Dashboard /> } />
					<Route path='/ticket/new' render={ () => <TicketCtx><TicketGet /></TicketCtx> } />
					<Route path='/ticket/:id' render={ () => <TicketCtx><TicketGet /></TicketCtx> } />
				</Switch>
			</Main$>
		</BrowserRouter>
	);
}

export default App;

const navbarHeight = '80px';
const sidebarWidth = '200px';

const Navbar$ = styled.nav`
	position: relative;
	width: 100%;
	height: ${ navbarHeight };
	display: flex;
	justify-content: center;
	align-items: center;
	background: #3e4449;
	flex-shrink: 0;
	border-bottom: 5px solid steelblue;
	color: white;

	.navlink {
		padding: 1rem;
		margin: 1rem;
		font-size: 1.5rem;
	}

	.settings {
		position: absolute;
		right:0;
		top: 50%;
		transform: translate(-3rem, -50%);
	}
`;

const Sidebar$ = styled.nav`
	height: ${ 'calc(100% - ' + navbarHeight + ')' };
	width: ${sidebarWidth };
	padding-top: 0.2rem;
	background: #3e4449;
	display: flex;
	flex-direction: column;

	a {
		padding: 0.5rem;
		padding-left: 1rem;
		border-bottom: 1px solid #00000030; 
	}
`;

const Main$ = styled.div`
	height: ${ 'calc(100% - ' + navbarHeight + ')' };
	max-width: ${ 'calc(100% - ' + sidebarWidth + ')' };
	flex-grow: 1;
	overflow-x: hidden;
	overflow-y: scroll;
`;