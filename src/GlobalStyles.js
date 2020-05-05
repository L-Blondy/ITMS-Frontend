import { createGlobalStyle } from 'styled-components';

const fontFam = {
	prim: "'Nunito', sans-serif"
};

const GlobalStyles = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		font-family: ${ fontFam.prim };
		box-sizing: border-box;
	}

	html,body,#root {
		height: 100%;
		width: 100%;
	}

	#root {
		display: flex;
		flex-wrap: wrap;
	}

	button {
		font-size: inherit;
		padding: 0.35em 1.2em;
		border-style: solid;
		border-width: 1px;

		&:hover {
			cursor: pointer;
		}
	}

	a {
		color: white;
		text-decoration: none;

		&:hover {
			opacity: 0.7;
		}

		&.active {
			color: #b4c0ca;
		}
	}

	.alert-container {
		position: absolute;
		top:50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10000;
		color: red;
	}
`;

export {
	fontFam,
	GlobalStyles
};
