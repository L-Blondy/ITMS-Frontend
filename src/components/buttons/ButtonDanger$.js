import styled from 'styled-components';
import ButtonCommon$ from './ButtonCommon$';
import { CLR } from '#/GlobalStyles';

const ButtonDanger$ = styled(ButtonCommon$)`
	box-shadow: none;
	background: ${ CLR.BACKGROUND.DANGER };
	box-shadow: 0 0 0 1px ${ CLR.BACKGROUND.DANGER };
	color: white;
	/* padding: 0.25em 0.8rem; */
	/* font-weight: bold; */

	&.disabled {
		filter: grayscale(1)
	}

	&:hover {
		opacity: 0.66;
	}
`;

export default ButtonDanger$;