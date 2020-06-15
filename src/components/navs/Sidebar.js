import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FlexRow$, FlexCol$ } from '../flex';

function Sidebar(props) {
	return (
		<FlexRow$$ as='nav' { ...props }>
			<FlexCol$ as='ul'>
				<li>
					<NavLink$ to='/it/report'>Report</NavLink$>
				</li>
				<li>
					<NavLink$ to='/it/ticket/incidents/new'>Open Incident</NavLink$>
				</li>
				<li>
					<NavLink$ to='/it/ticket/requests/new'>Open Request</NavLink$>
				</li>
				<li>
					<NavLink$ to='/it/ticket/changes/new'>Open Change</NavLink$>
				</li>
				<li>
					<NavLink$ to='/it/administration/incidents/categories'>Incident Cat</NavLink$>
				</li>
				<li>
					<NavLink$ to='/it/administration/requests/categories'>Request Cat</NavLink$>
				</li>
				<li>
					<NavLink$ to='/it/administration/changes/categories'>Change Cat</NavLink$>
				</li>
				<li>
					<NavLink$ to={ `/it/ticket/incidents` }>Incident Search </NavLink$>
				</li>
				<li>
					<NavLink$ to={ `/it/ticket/requests` }>Request Search</NavLink$>
				</li>
				<li>
					<NavLink$ to={ `/it/ticket/changes` }>Change Search</NavLink$>
				</li>
			</FlexCol$>
		</FlexRow$$>
	);
}

export default Sidebar;

const FlexRow$$ = styled(FlexRow$)`
	height: 100%;
	width: 200px;
	flex-shrink: 0;

	ul {
		height: 100%;
		width: 200px;
		padding-top: 0.2rem;
		background: #3e4449;
		display: flex;
		flex-direction: column;
	}
	
	li {
		display: flex;
	}
`;

const NavLink$ = styled(NavLink)`
	padding: 0.5rem;
	padding-left: 1rem;
	border-bottom: 1px solid #00000030; 
	flex-basis: 100%;
`;