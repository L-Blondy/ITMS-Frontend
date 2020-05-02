import React, { createContext } from 'react';

export const UserCtx = createContext();

function Context({ children }) {
	return (
		<UserCtx.Provider value={ 'Guest user' }>
			{ children }
		</UserCtx.Provider>
	);
}

export default Context;
