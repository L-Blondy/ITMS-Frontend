import '#/polyfills/Array.includes.js';
import '#/polyfills/Array.from.js';
import '#/polyfills/String.includes.js';
import '#/polyfills/String.isOneOf.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App.js';

ReactDOM.render((
	<App />
), document.getElementById('root'));