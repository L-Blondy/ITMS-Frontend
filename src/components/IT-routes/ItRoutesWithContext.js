import React, { createContext, useState, useEffect } from 'react';
import { BASE_URL } from '../../../BASE_URL';
import { ItRoutes } from './';

export const ItRoutesCtx = createContext();

function ItRoutesWithContext() {

	const [ initialData, setInitialData ] = useState();
	const [ error, setError ] = useState();
	const [ areOpened, setAreOpened ] = useState(false);

	const itRoutesCtx = {
		BASE_URL,
		initialData,
		setInitialData,
		error,
		setError,
		settings: {
			areOpened,
			setAreOpened
		}
	};

	return (
		<ItRoutesCtx.Provider value={ itRoutesCtx }>
			<ItRoutes />
		</ItRoutesCtx.Provider>
	);
}

export default ItRoutesWithContext;
