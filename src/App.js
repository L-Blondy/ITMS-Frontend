import './utils/setDefaultLocalStorage';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalContext from './GlobalContext.js';
import { GlobalStyles } from './GlobalStyles.js';
import { LoginPage } from './pages/login';
// import { ItRoutes } from './pages/it-routes';
import { CommonRoutes } from './pages/common-routes';
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
