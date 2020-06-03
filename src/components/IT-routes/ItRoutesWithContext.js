import React, { createContext, useState, useEffect } from 'react';
import { ItRoutes } from './';

export const ItRoutesCtx = createContext();

function ItRoutesWithContext() {

	const [ initialData, setInitialData ] = useState();
	const [ error, setError ] = useState();
	const [ areOpened, setAreOpened ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);

	useEffect(() => console.log(areOpened), [ areOpened ]);

	const itRoutesCtx = {
		initialData,
		setInitialData,

		fetching: {
			error,
			setError,
		},
		settings: {
			areOpened,
			setAreOpened,
		},
		page: {
			isLoading,
			setIsLoading
		}
	};

	return (
		<ItRoutesCtx.Provider value={ itRoutesCtx }>
			<ItRoutes />
		</ItRoutesCtx.Provider>
	);
}

export default ItRoutesWithContext;
