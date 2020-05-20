import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
	return (
		<Sidebar$ className='sidebar'>
			<Link to='/it/ticket/incidents/new'>Open Incident</Link>
			<Link to='/it/ticket/requests/new'>Open Request</Link>
			<Link to='/it/ticket/changes/new'>Open Change</Link>
			<Link to='/it/administration/incidents/categories'>Incident Cat</Link>
			<Link to='/it/administration/requests/categories'>Request Cat</Link>
			<Link to='/it/administration/changes/categories'>Change Cat</Link>
			<Link to='/it/ticket/incidents'>Incident Search </Link>
			<Link to='/it/ticket/requests'>Request Search</Link>
			<Link to='/it/ticket/changes'>Change Search</Link>
		</Sidebar$>
	);
}

export default Sidebar;

const Sidebar$ = styled.nav`
	height: 100%;
	width: 200px;
	padding-top: 0.2rem;
	background: #3e4449;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;

	a {
		padding: 0.5rem;
		padding-left: 1rem;
		border-bottom: 1px solid #00000030; 
	}
`;