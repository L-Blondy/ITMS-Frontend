import styled from 'styled-components';
import ButtonCommon$ from './ButtonCommon$';
import { CLR } from '#/GlobalStyles';

const ButtonSecondary$ = styled(ButtonCommon$)`
	background-color: ${ CLR.BUTTON.SECONDARY };
	border-color: ${ CLR.BUTTON.SECONDARY };
	color: white;
`;

export default ButtonSecondary$;
