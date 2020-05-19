import { createGlobalStyle } from 'styled-components';

const CLR = {
	PRIMARY: '#4999a3',
	FONT: {
		PRIMARY: '#2a4a4f',
	},
	BORDER: {
		PRIMARY: '#9eb3b6'
	}
};

const FONT_FAM = {
	PRIMARY: "'Nunito', sans-serif"
};

const BTN_CLR = {
	PRIMARY: CLR.PRIMARY,
	SECONDARY: '#CCCCCC',
	ALERT: {
		PRIMARY: '#61a0d5',
		SECONDARY: '#CCCCCC'
	}
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
	}

	#root {
		display: flex;
		flex-direction: column;
	}

	a {
		color: white;
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

	[class*='btn-contained'],
	[class*='btn-outlined'] {
		padding: 0.25em 0.8em;
		display: inline-block;
		user-select: none;
		border-width: 1px;
		border-style: solid;
		cursor: pointer;
		border-collapse: separate;

		&:hover {
			opacity: 0.66;
		}
	}

	.btn-contained {

		&-prim {
			background-color: ${ BTN_CLR.PRIMARY };
			border-color: ${ BTN_CLR.PRIMARY };
			color: white;
		}

		&-sec {
			background-color: ${ BTN_CLR.SECONDARY };
			border-color: ${ BTN_CLR.SECONDARY };
			color: white;
			font-weight: bold;
		}

		&-alert-prim {
			background-color: ${ BTN_CLR.ALERT.PRIMARY };
			border-color: ${ BTN_CLR.ALERT.PRIMARY };
			color: white;
		}

		&-alert-sec {
			background-color: ${ BTN_CLR.ALERT.SECONDARY };
			border-color: ${ BTN_CLR.ALERT.SECONDARY };
			color: white;
			font-weight: bold;
		}
	}

	.light-font {
		color: #777;
	}
`;

export {
	CLR,
	FONT_FAM,
	GlobalStyles
};
