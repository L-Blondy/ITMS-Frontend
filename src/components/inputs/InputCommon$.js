import styled from 'styled-components';
import { CLR } from '#/GlobalStyles';

const InputCommon$ = styled.span`
	position: relative;
	font-size: 0;

	* {
		font-size: 15px;
	}

	label, .label {
		line-height: 28px;
		display: block;
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

	input, textarea, select, .select, .select-column {
		width: 100%;
		border-radius: 3px;
		padding-left: 0.6em;
		padding-right: 0.6em;
		border: 1px solid ${ CLR.BORDER.PRIMARY };
		line-height: inherit;
		background: white;

		&:disabled, &.disabled {
			background-color: #eaf0f1;
			opacity: 0.8;
			
			* {
				color: inherit;
			}
		}

		&:focus {
			box-shadow: 0 0 0 1px #1db8cc;
			outline: none;
		}
	}

	.option {
		padding: 0 0.6em;
		line-height: 1.6em;
		user-select: none;

		&:hover, &:focus {
			background: ${ CLR.BUTTON.PRIMARY_HOVER };
			outline: none;
			cursor: pointer;
		}

		&.hightlighted {
			background: ${ CLR.BUTTON.PRIMARY };
			color: white;
		}
	}

	.select{
		padding: 0;

		&:focus-within {
			box-shadow: 0 0 0 1px #1db8cc;
		}

		input:focus {
			box-shadow: none;
		}

		&-column {
			padding: 0;
		}

		[class*="control"] {
			border: none;
			min-height: 0;
			background: none;

			&:focus-within {
				box-shadow: none;
			}
		}

		[class*="singleValue"] {
			margin: 0
		}

		[class*="ValueContainer"] {
			padding-top: 0;
			padding-bottom: 0;
		}

		[class*="indicatorContainer"] {
			padding: 0 0.1em;
			cursor: pointer;
		}

		[class*="option"] {
			line-height: 10px;
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