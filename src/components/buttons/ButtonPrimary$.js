import styled from 'styled-components';
import ButtonCommon$ from './ButtonCommon$';
import { BTN_CLR } from '../../GlobalStyles';

const ButtonPrimary$ = styled(ButtonCommon$)`
	background-color: ${ BTN_CLR.PRIMARY };
	border-color: ${ BTN_CLR.PRIMARY };
	color: white;
`;

export default ButtonPrimary$;
