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

	input, textarea, select, .select {
		width: 100%;
		border-radius: 3px;
		padding-left: 0.45rem;
		padding-right: 0.45rem;
		border: 1px solid ${ CLR.BORDER.PRIMARY };
		line-height: inherit;
		background: white;

		&:disabled {
			background-color: #eaf0f1;
			opacity: 1;
		}
	}

	.select {
		padding: 0;

		[class*="control"] {
			border: none;
			min-height: 0;
		}

		[class*="ValueContainer"] {
			padding-top: 0;
			padding-bottom: 0;
		}

		[class*="indicatorContainer"] {
			padding: 0;
		}

		input {
			min-height: 0;
		}
	}

	input, select, .select {
		min-height: 28px;
	}

	textarea {
		padding-top: 0.13rem;
		padding-bottom: 0.13rem;
		resize: none;
	}

	.invalid {
		border-color: ${ CLR.BACKGROUND.DANGER } !important;
		outline-color: ${ CLR.BACKGROUND.DANGER } !important;
		background-color: rgba(255, 0, 0, 0.03);
	}

	.error {
		color: red;
		font-size: 0.85em;
	}
`;

export default InputCommon$;