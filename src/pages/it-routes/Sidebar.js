import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FlexRow$, FlexCol$ } from '../../components/flex';

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
					<NavLink$ to='/it/categories/incidents'>Incident Cat</NavLink$>
				</li>
				<li>
					<NavLink$ to='/it/categories/requests'>Request Cat</NavLink$>
				</li>
				<li>
					<NavLink$ to='/it/categories/changes'>Change Cat</NavLink$>
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
				<li>
					<NavLink$ to={ `/it/groups` }>All groups</NavLink$>
				</li>
				<li>
					<NavLink$ to={ `/it/groups/new` }>New group</NavLink$>
				</li>
				<li>
					<NavLink$ to={ `/it/users` }>All users</NavLink$>
				</li>
				<li>
					<NavLink$ to={ `/it/users/new` }>New user</NavLink$>
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
	
	a {
		color: white;
	}
`;

const NavLink$ = styled(NavLink)`
	padding: 0.5rem;
	padding-left: 1rem;
	border-bottom: 1px solid #00000030; 
	flex-basis: 100%;
`;
