import styled from 'styled-components';
import ButtonCommon$ from './ButtonCommon$';
import { CLR } from '#/GlobalStyles';

const Primary$ = styled(ButtonCommon$)`
	background-color: ${ CLR.BUTTON.ALERT.PRIMARY };
	border-color: ${ CLR.BUTTON.ALERT.PRIMARY };
	color: white;
`;

const Secondary$ = styled(ButtonCommon$)`
	background-color: ${ CLR.BUTTON.SECONDARY };
	border-color: ${ CLR.BUTTON.SECONDARY };
	color: white;
`;

export default { Primary$, Secondary$ };