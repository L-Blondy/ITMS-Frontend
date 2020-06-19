import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CLR } from '../../GlobalStyles';
import { FlexRow$ } from '../../components/flex';

function Navbar(props) {
	return (
		<FlexRow$$ as='nav' { ...props }>
			<FlexRow$ as='ul'>
				<li>
					<NavLink$ className='navlink' to='/it/dashboard'>Dashboard</NavLink$>
				</li>
				<li>
					<NavLink$ className='navlink' to='/it'>Administration</NavLink$>
				</li>
				<li>
					<NavLink$ className='navlink' to='/it/sdfff'>Anywhere</NavLink$>
				</li>

				<button className="settings" onClick={ () => itRoutesCtx.settings.setAreOpened(true) }>Settings</button>
			</FlexRow$>
		</FlexRow$$>
	);
}

export default Navbar;

const FlexRow$$ = styled(FlexRow$)`
	position: relative;
	width: 100%;
	height: 80px;
	flex-shrink: 0;
	border-bottom: 5px solid ${ CLR.PRIMARY_VIBRANT };
	color: white;

	a {
		color: white;
	}

	ul {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #3e4449;
	}

	.settings {
		position: absolute;
		right:0;
		top: 50%;
		transform: translate(-3rem, -50%);
	}
`;

const NavLink$ = styled(NavLink)`
	padding: 1rem;
	margin: 1rem;
	font-size: 1.5rem;
`;
