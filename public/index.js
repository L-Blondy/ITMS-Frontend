import '../src/polyfills/Array.includes.js';
import '../src/polyfills/Array.from.js';
import '../src/polyfills/String.includes.js';
import '../src/polyfills/String.isOneOf.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App.js';

ReactDOM.render((
	<App />
), document.getElementById('root'));