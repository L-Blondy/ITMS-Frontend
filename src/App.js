import './utils/setDefaultLocalStorage';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalContext from './GlobalContext.js';
import { GlobalStyles } from './GlobalStyles.js';
import { LoginPage } from './pages/login';
import { ItRoutesContext } from './pages/it-routes';
import { CommonRoutes } from './pages/common-routes';

function App() {

	return (
		<GlobalContext >
			<GlobalStyles />
			<BrowserRouter>
				<Switch>
					<Route path='/login' render={ () => <LoginPage /> } />
					<Route path='/it' render={ () => <ItRoutesContext /> } />
					<Route path='/' render={ () => <CommonRoutes /> } />
				</Switch>
			</BrowserRouter>
		</GlobalContext>
	);
}

export default App;
