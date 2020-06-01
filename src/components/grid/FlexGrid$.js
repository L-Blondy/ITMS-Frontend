import styled from 'styled-components';

const FlexGrid$ = styled.form`
	flex-grow: 1;
	width: 100%;
	height: 100%;
	display: flex;
	font-size: 15px;
	overflow: auto;

	.column {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		background: white;
		flex-grow: 1;

		> * {
			min-width: 100%;
			max-width: 15vw;
			height: 2.5em;
			line-height: 2.5em;
			white-space: nowrap;
			display: flex;
			align-items: center;
		}
	}
`;

export default FlexGrid$;
