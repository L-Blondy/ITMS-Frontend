import styled from 'styled-components';
import Common$ from './Common$';
import { CLR } from '../../GlobalStyles';

const Danger$ = styled(Common$)`
	box-shadow: none;
	background: ${ CLR.BACKGROUND.DANGER };
	box-shadow: 0 0 0 1px ${ CLR.BACKGROUND.DANGER };
	color: white;
	padding: 0.25 0.8rem;
	font-weight: bold;

	&.disabled {
		filter: grayscale(1)
	}

	&:hover {
		opacity: 0.66;
	}
`;

export default Danger$;