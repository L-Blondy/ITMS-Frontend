import styled from 'styled-components';
import ButtonCommon$ from './ButtonCommon$';
import { BTN_CLR } from '../../GlobalStyles';

const ButtonSecondary$ = styled(ButtonCommon$)`
	background-color: ${ BTN_CLR.SECONDARY };
	border-color: ${ BTN_CLR.SECONDARY };
	color: white;
	font-weight: bold;
`;

export default ButtonSecondary$;
