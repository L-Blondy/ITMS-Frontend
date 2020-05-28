import styled from 'styled-components';
import Common$ from './Common$';
import { BTN_CLR } from '../../GlobalStyles';

const Primary$ = styled(Common$)`
	background-color: ${ BTN_CLR.ALERT.PRIMARY };
	border-color: ${ BTN_CLR.ALERT.PRIMARY };
	color: white;
`;

const Secondary$ = styled(Common$)`
	background-color: ${ BTN_CLR.SECONDARY };
	border-color: ${ BTN_CLR.SECONDARY };
	color: white;
	font-weight: bold;
`;

export default { Primary$, Secondary$ };