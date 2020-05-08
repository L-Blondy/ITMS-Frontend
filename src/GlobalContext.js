import React, { createContext } from 'react';

export const UserCtx = createContext();

function GlobalContext({ children }) {
	return (
		<UserCtx.Provider value={ 'Guest user' }>
			{ children }
		</UserCtx.Provider>
	);
}

export default GlobalContext;
