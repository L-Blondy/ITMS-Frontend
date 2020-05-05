import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App.js';
import Context from '../src/Context.js';
import { GlobalStyles } from '../src/GlobalStyles.js';

ReactDOM.render((
	<Context>
		<GlobalStyles />
		<App />
	</Context>
), document.getElementById('root'));