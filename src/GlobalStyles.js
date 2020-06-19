import { createGlobalStyle } from 'styled-components';
import { preloader } from '/assets/icons';

const CLR = {
	PRIMARY: '#4999a3',
	PRIMARY_VIBRANT: '#149aab',
	BACKGROUND: {
		LIGHT: '#d8e1e2',
		DANGER: '#dd3131'
	},
	FONT: {
		PRIMARY: '#2a4a4f',
		LIGHT: '#828c8d'
	},
	BORDER: {
		PRIMARY: '#9eb3b6'
	},
	BUTTON: {
		PRIMARY: '#4999a3',
		SECONDARY: '#CCCCCC',
		ALERT: {
			PRIMARY: '#61a0d5',
			SECONDARY: '#CCCCCC'
		}
	}
};

const FONT_FAM = {
	PRIMARY: "'Nunito', sans-serif"
};

const GlobalStyles = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		font-family: ${ FONT_FAM.PRIMARY };
		box-sizing: border-box;
		color: ${ CLR.FONT.PRIMARY };
	}

	html,body,#root {
		height: 100%;
		max-height: 100%;
		width: 100%;
		overflow: hidden;
	}

	#root {
		display: flex;
		flex-direction: column;
	}

	a {
		text-decoration: none;
		cursor: pointer;

		&:hover {
			opacity: 0.7;
		}

		&.active {
			color: #b4c0ca;
		}
	}

	input, textarea, select, button {
		font-size: inherit;
	}

	input[type=checkbox] {
		height: 1em;
		width: 1em;
	}

	.alert-container {
		position: absolute;
		top:50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10000;
		color: red;
	}

	.disabled {
		opacity: 0.35;
		pointer-events: none;
	}

	button {
		border: none;
		cursor: pointer;
	}

	.light-font {
		color: ${ CLR.FONT.LIGHT }
	}

	.is-loading {
		pointer-events: none;
		position: relative;

		&::before {
			content: "";
			position: absolute;
			top:0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0,0,0,0.25);
			z-index: 1005;
		}
		
		&::after {
			content: "";
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			height: 100px;
			width:100px;
			background-image: url(${ preloader });
			background-position: center;
			background-repeat: no-repeat;
			background-size: contain;
			z-index: 1006;
		}
	}	
`;

export {
	CLR,
	FONT_FAM,
	GlobalStyles
};
