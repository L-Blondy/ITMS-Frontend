import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App.js';
import GlobalContext from '../src/GlobalContext.js';
import { GlobalStyles } from '../src/GlobalStyles.js';

if (!Array.prototype.includes) {
	Array.prototype.includes = function (value) {
		for (let i = 0; i < this.length; i++) {
			const current = this[ i ];
			if (current === value)
				return true;
		}
		return false;
	};
}

ReactDOM.render((
	<GlobalContext>
		<GlobalStyles />
		<App />
	</GlobalContext>
), document.getElementById('root'));