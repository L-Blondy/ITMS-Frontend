import React, { useEffect, useState } from 'react';
import { http } from '../../utils';
import { BASE_URL } from '/BASE_URL';

function Async({ onProgress, onLoad, onError }) {
	useEffect(() => {
		http()
			.get(BASE_URL + location.pathname)
			.then(res => {
				setSwitchKey(Math.random());
				itRoutesCtx.page.setIsLoading(false);
				itRoutesCtx.setInitialData(res);
			})
			.catch(e => {
				itRoutesCtx.page.setIsLoading(false);
				itRoutesCtx.fetching.setError(e);
			});
	}, []);

	return null;
}

export default Async;
