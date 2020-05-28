import styled from 'styled-components';
import Common$ from './Common$';
import { BTN_CLR } from '../../GlobalStyles';

const Primary$ = styled(Common$)`
	background-color: ${ BTN_CLR.PRIMARY };
	border-color: ${ BTN_CLR.PRIMARY };
	color: white;
`;

export default Primary$;
