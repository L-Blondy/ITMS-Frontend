import styled from 'styled-components';
import ButtonCommon$ from './ButtonCommon$';
import { CLR } from '#/GlobalStyles';

const ButtonPrimary$ = styled(ButtonCommon$)`
	background-color: ${ CLR.BUTTON.PRIMARY };
	border-color: ${ CLR.BUTTON.PRIMARY };
	color: white;
`;

export default ButtonPrimary$;
