import styled from 'styled-components';
import { CLR } from '../../GlobalStyles';

const Simple$ = styled.label`
	position: relative;
	margin-top: 1rem;
	margin-bottom: 0.3rem;

	span {
		position: absolute;
		right: calc(100% + 1.5rem);
		white-space: nowrap;
	}

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

export default Simple$;