import styled from 'styled-components';
import { CLR } from '../../GlobalStyles';

const InputCommon$ = styled.span`
	position: relative;
	font-size: 0;

	* {
		font-size: 15px;
	}

	${props => props.disabled && `
		&::after {
			content: '';
			position: absolute;
			right: 1px;
			top: 1px;
			bottom: 1px;
			width: 2rem;
			background: #eaf0f1;
			border-radius: 3px;
		}
	`};

	
	
	input, textarea, select {
		width: 100%;
		border-radius: 3px;
		padding-left: 0.45rem;
		padding-right: 0.45rem;
		border: 1px solid ${ CLR.BORDER.PRIMARY };

		&:disabled {
			background-color: #eaf0f1;
			opacity: 1;
		}
	}

	input, select {
		height: 1.6em;
	}

	textarea {
		padding-top: 0.13rem;
		padding-bottom: 0.13rem;
		resize: none;
	}
`;

export default InputCommon$;