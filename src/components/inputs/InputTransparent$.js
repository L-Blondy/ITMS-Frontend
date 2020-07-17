import styled from 'styled-components';
import { InputCommon$ } from '#/components/inputs';

const InputTransparent$ = styled(InputCommon$)`
	flex-grow: 1;

	.input {
		border-radius: 3px;
		line-height: 30px;
		height: 30px;
		padding-left: 0.7rem;
		border: none;
		border-radius: 30px;
		background: transparent;

		&:focus {
			outline: none;
			box-shadow: none;
		}

		&::placeholder {
			color: #4dadb9;
		}
	}

	.select {
		height: 30px;
		background-color: transparent;
		border: none;



		&:focus,&:focus-within {
			box-shadow: none
		}

		[class*="-ValueContainer"] {
			height: 30px;
		}
		[class*="-control"] {
			&:focus-within {
				box-shadow: none
			}
		}
		[class*="indicator"] {
			display: none;
		}
	}
	
`;

export default InputTransparent$;