import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App.js';
import Context from '../src/Context.js';
import { GlobalStyles } from '../src/GlobalStyles.js';

ReactDOM.render((
	<Context>
		<BrowserRouter>
			<GlobalStyles />
			<App />
		</BrowserRouter>
	</Context>
), document.getElementById('root'));