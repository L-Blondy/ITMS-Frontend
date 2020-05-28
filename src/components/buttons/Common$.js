import styled from 'styled-components';

const Common$ = styled.button`
	cursor: pointer;
	padding: 0.25em 0.8em;
	display: inline-block;
	user-select: none;
	border-width: 1px;
	border-style: solid;
	border: none;

	&:hover {
		opacity: 0.66;
	}
`;

export default Common$;