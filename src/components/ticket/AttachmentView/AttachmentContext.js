import React, { createContext } from 'react';

export const AttachmentCtx = createContext();

function AttachmentContext({ children }) {
	return (
		<AttachmentCtx.Provider value={ 'Guest user' }>
			{ children }
		</AttachmentCtx.Provider>
	);
}

export default AttachmentContext;
