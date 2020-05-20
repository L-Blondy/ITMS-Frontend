import styled from 'styled-components';
import { CLR } from '../../GlobalStyles';

const ControlBar$ = styled.div`
	display: flex;
	justify-content:space-between;
	background-color: ${ CLR.BACKGROUND.LIGHT };
	padding: 0.5rem 1rem 0.5rem 0.8rem;

	.controls {
		height: 100%;
		display: flex;
	}
`;

export default ControlBar$;