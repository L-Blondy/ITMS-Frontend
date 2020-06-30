import React, { createContext, useState, useEffect } from 'react';
import { ItRoutes } from '.';

export const ItRoutesCtx = createContext();

function ItRoutesContext() {

	const [ areOpened, setAreOpened ] = useState(false);

	const itRoutesCtx = {

		settings: {
			areOpened,
			setAreOpened,
		},
	};

	return (
		<ItRoutesCtx.Provider value={ itRoutesCtx }>
			<ItRoutes />
		</ItRoutesCtx.Provider>
	);
}

export default ItRoutesContext;
