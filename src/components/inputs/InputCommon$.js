import styled from 'styled-components';
import { CLR } from '../../GlobalStyles';

const InputCommon$ = styled.label`
	position: relative;
	
	input, textarea, select {
		width: 100%;
		font-size: inherit;
		border-radius: 3px;
		padding-left: 0.45rem;
		padding-right: 0.45rem;
		border: 1px solid ${CLR.BORDER.PRIMARY };
	}

	input, select {
		height: 1.6em;
	}

	input:disabled {
		background-color: #eaf0f1;
	}

	textarea {
		padding-top: 0.13rem;
		padding-bottom: 0.13rem;
		resize: none;
	}
`;

export default InputCommon$;