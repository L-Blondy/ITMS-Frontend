import styled from 'styled-components';

const Form$ = styled.form`
	position: relative;
	font-size: 14px;
	margin-bottom: 3rem;
	padding-top:1rem;
	width: 70%;
	margin: auto;

	.invalid{
		background: rgba(255,0,0,0.020);
		outline-color: rgba(255,0,0,0.53);
		border-color: rgba(255,0,0,0.53);
	}

	.columns-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.full-width {
		display: flex;
		flex-direction: column;
		margin-top: 1.5rem;
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: calc(100px + 20% )
	}
`;

export default Form$;
