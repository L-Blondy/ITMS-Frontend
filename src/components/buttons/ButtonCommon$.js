import styled from 'styled-components';

const ButtonCommon$ = styled.button`
	cursor: pointer;
	padding: 0.3em 1em;
	display: inline-block;
	user-select: none;
	border-width: 1px;
	border-style: solid;
	border: none;

	&:hover {
		opacity: 0.66;
	}

	&:disabled {
		background: #ccc;

		&:hover {
			opacity: 1;
		}
	}
`;

export default ButtonCommon$;