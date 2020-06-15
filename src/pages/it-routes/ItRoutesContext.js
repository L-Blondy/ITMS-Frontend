import React, { createContext, useState, useEffect } from 'react';
import { ItRoutes } from '.';

export const ItRoutesCtx = createContext();

function ItRoutesContext() {

	const [ initialData, setInitialData ] = useState();
	const [ error, setError ] = useState();
	const [ areOpened, setAreOpened ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);

	useEffect(() => console.log(initialData), [ initialData ]);

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

export default ItRoutesContext;
