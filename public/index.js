import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App.js';

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
	<App />
), document.getElementById('root'));