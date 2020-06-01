import styled from 'styled-components';
import { CLR } from '../../GlobalStyles';

const Navbar$ = styled.nav`
	position: relative;
	width: 100%;
	height: 80px;
	flex-shrink: 0;
	border-bottom: 5px solid ${ CLR.PRIMARY_VIBRANT };
	color: white;

	ul {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #3e4449;
	}

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

export default Navbar$