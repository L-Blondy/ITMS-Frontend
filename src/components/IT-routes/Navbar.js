import styled from 'styled-components';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ItRoutesCtx } from './ItRoutesWithContext';

function Navbar() {

	const itRoutesCtx = useContext(ItRoutesCtx);

	return (
		<Navbar$ className='navbar'>
			<NavLink className='navlink' to='/it/dashboard'>Dashboard</NavLink>
			<NavLink className='navlink' to='/it/administration'>Administration</NavLink>
			<NavLink className='navlink' to='/it/sdfff'>Anywhere</NavLink>

			<button className="settings" onClick={ () => itRoutesCtx.settings.setAreOpened(true) }>Settings</button>
		</Navbar$>
	);
}

export default Navbar;

const Navbar$ = styled.nav`
	position: relative;
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #3e4449;
	flex-shrink: 0;
	border-bottom: 5px solid #149aab;
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
