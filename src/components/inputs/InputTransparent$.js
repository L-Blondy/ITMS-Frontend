import styled from 'styled-components';

const InputTransparent$ = styled.span`
	flex-grow: 1;

	input {
		border-radius: 3px;
		font-size: inherit;
		line-height: 2em;
		height: 2em;
		padding-left: 0.7rem;
		border: none;
		border-radius: 30px;
		background: transparent;

		&:focus {
			outline: none;
		}

		&::placeholder {
			color: #4dadb9;
		}
	}
	
`;

export default InputTransparent$;