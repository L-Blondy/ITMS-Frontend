import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
	return (
		<Sidebar$ className='sidebar'>
			<Link to='/it/ticket/new?type=INC'>Open Incident</Link>
			<Link to='/it/ticket/new?type=REQ'>Open Request</Link>
			<Link to='/it/ticket/new?type=CHG'>Open Change</Link>
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

	a {
		padding: 0.5rem;
		padding-left: 1rem;
		border-bottom: 1px solid #00000030; 
	}
`;