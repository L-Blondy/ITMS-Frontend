import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { http } from '../utils';
import { BASE_URL } from '/BASE_URL';
import { Preloader } from '../components/preloader';
import { ErrorPage } from '../components/error';

function withInitialFetch(Target) {

	return function T(props) {
		const [ error, setError ] = useState();
		const [ data, setData ] = useState();
		const location = useLocation();

		useEffect(() => {
			setTimeout(() => {
				http()
					.get(BASE_URL + location.pathname)
					.then(res => setData(res))
					.catch(e => setError(e));
			}, 300);
		}, []);

		useEffect(() => console.log('MOUNT INITIAL FETCH'), []);

		if (!error && !data) {
			return <Preloader />;
		}
		if (error) {
			return <ErrorPage error={ error } />;
		}
		return <Target { ...props } initialData={ data } />;
	};
}

export default withInitialFetch;