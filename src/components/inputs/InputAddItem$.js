import styled from 'styled-components';

const AddItem$ = styled.label`
	flex-grow: 1;

	input {
		border-radius: 3px;
		font-size: inherit;
		line-height: 2em;
		height: 2em;
		padding-left: 0.7rem;
		border: none;
		border-radius: 30px;
		background: #f3f5f5;
		
		@supports(filter: brightness(0)){
			background: inherit;	
		}

		&:focus {
			outline: none;
		}

		&::placeholder {
			color: #4dadb9;
		}
	}
	
`;

export default AddItem$;