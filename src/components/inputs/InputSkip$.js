import styled from 'styled-components';
import { CLR } from '../../GlobalStyles';

const InputSkip$ = styled.label`
	display: flex;
	flex-direction: row-reverse;
	align-items: center;

	input {
		width: 3em;
		text-align: right;
		margin-right: 0.5em;
		border: 1px solid ${CLR.BORDER.PRIMARY };
		border-radius: 2px
	} 
`;

export default InputSkip$;
