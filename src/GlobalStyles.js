import { createGlobalStyle } from 'styled-components';
import { preloader } from '/assets/icons';

const CLR = {
	PRIMARY: '#4999a3',
	PRIMARY_VIBRANT: '#149aab',
	BACKGROUND: {
		LIGHT: '#d8e1e2',
	},
	FONT: {
		PRIMARY: '#2a4a4f',
		LIGHT: '#828c8d'
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

	.form-element {
		position: relative;
		margin-top: 1rem;
		margin-bottom: 0.3rem;

		span {
			position: absolute;
			right: calc(100% + 1.5rem);
			white-space: nowrap;
		}

		input, textarea, select {
			width: 100%;
			font-size: inherit;
			border-radius: 3px;
			padding-left: 0.45rem;
			padding-right: 0.45rem;
		}

		input, select {
			height: 1.6em;
		}

		input:disabled {
			background-color: #eaf0f1;
		}

		textarea {
			padding-top: 0.13rem;
			padding-bottom: 0.13rem;
			resize: none;
		}
	}
`;

export {
	CLR,
	FONT_FAM,
	GlobalStyles
};
