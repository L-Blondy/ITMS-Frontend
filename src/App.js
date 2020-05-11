import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalContext from './GlobalContext.js';
import { GlobalStyles } from './GlobalStyles.js';
import { ItRoutesWithContext } from './components/IT-routes';
import { CommonRoutes } from './components/Common-routes';

function App() {

	return (
		<GlobalContext >
			<GlobalStyles />
			<BrowserRouter>
				<Switch>
					<Route path='/it' render={ () => <ItRoutesWithContext /> } />
					<Route path='/' render={ () => <CommonRoutes /> } />
				</Switch>
			</BrowserRouter>
		</GlobalContext>
	);
}

export default App;
