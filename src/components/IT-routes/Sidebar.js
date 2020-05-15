import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
	return (
		<Sidebar$ className='sidebar'>
			<Link to='/it/ticket/INC/new'>Open Incident</Link>
			<Link to='/it/ticket/REQ/new'>Open Request</Link>
			<Link to='/it/ticket/CHG/new'>Open Change</Link>
			<Link to='/it/administration/INC/categories'>Incident Cat</Link>
			<Link to='/it/administration/REQ/categories'>Request Cat</Link>
			<Link to='/it/administration/CHG/categories'>Change Cat</Link>
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