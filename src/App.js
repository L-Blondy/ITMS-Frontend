import './utils/setDefaultLocalStorage';
import React from 'react';
import GlobalContext from './GlobalContext.js';
import { GlobalStyles } from './GlobalStyles.js';
import Router from './router/Router';

function App() {

	return (
		<GlobalContext >
			<GlobalStyles />
			<Router />
		</GlobalContext>
	);
}

export default App;
