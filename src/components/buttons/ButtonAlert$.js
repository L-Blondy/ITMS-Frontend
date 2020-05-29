import styled from 'styled-components';
import ButtonCommon$ from './ButtonCommon$';
import { BTN_CLR } from '../../GlobalStyles';

const Primary$ = styled(ButtonCommon$)`
	background-color: ${ BTN_CLR.ALERT.PRIMARY };
	border-color: ${ BTN_CLR.ALERT.PRIMARY };
	color: white;
`;

const Secondary$ = styled(ButtonCommon$)`
	background-color: ${ BTN_CLR.SECONDARY };
	border-color: ${ BTN_CLR.SECONDARY };
	color: white;
	font-weight: bold;
`;

export default { Primary$, Secondary$ };