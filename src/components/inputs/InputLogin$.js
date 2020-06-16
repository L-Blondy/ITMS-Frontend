import styled from 'styled-components';
import InputCommon$ from './InputCommon$';

const InputLogin$ = styled(InputCommon$)`
	display: flex;
	align-items: center;
	flex-grow: 1;
	line-height: 2.2rem;
	

	input {
		padding-left: 0.7rem;
		border-radius: 7px;
	}

	.errors {
		position: absolute;
		left: 100%;
		margin-left: 0.5em;
		white-space: nowrap;
	}

	.error {
		font-size: 0.8em;
		line-height: 1.7em;
		color: red;
	}
`;

export default InputLogin$;
