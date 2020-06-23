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
		overflow: hidden;
		line-height: inherit;

		&:disabled {
			background-color: #eaf0f1;
			opacity: 1;
		}
	}

	input, select {
		min-height: 1.6em;
	}

	textarea {
		padding-top: 0.13rem;
		padding-bottom: 0.13rem;
		resize: none;
	}

	.invalid {
		border-color: ${ CLR.BACKGROUND.DANGER } !important;
		outline-color: ${ CLR.BACKGROUND.DANGER } !important;
		background-color: rgba(255,0,0,0.03);
	}

	.results {
		border: 1px solid #888;
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		max-height: initial;
		box-shadow: 0 0 10px -5px black;
	}
`;

export default InputCommon$;