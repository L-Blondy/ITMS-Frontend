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
		padding: 0.5em 1.3em;
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
`;

export {
	fontFam,
	GlobalStyles
};
