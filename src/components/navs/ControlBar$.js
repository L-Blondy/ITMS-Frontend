import styled from 'styled-components';
import { CLR } from '../../GlobalStyles';

const ControlBar$ = styled.nav`
	display: flex;
	justify-content:space-between;
	background-color: ${ CLR.BACKGROUND.LIGHT };
	padding: 0.5rem 1rem 0.5rem 0.8rem;

	.controls {
		height: 100%;
		display: flex;
	}

	button {
		margin-left: 0.5rem;
	}

	.paperclip-btn {
		margin: 0 0.5rem;
	}

	.delete-btn {
		margin: 0
	}
`;

export default ControlBar$;