import React, { useEffect, useState } from 'react';
import { http } from '../../utils';
import { BASE_URL } from '/BASE_URL';
import { ErrorPage } from '../error';

function FetchCurrentLocation({ onProgress, onLoad, children: Children }) {

	const [ error, setError ] = useState();
	const [ data, setData ] = useState();

	useEffect(() => {
		http()
			.get(BASE_URL + location.pathname)
			.then(res => {
				console.log(res);
				setData(res);
			})
			.catch(e => {
				console.log(e);
				setError(e);
			});
	}, []);

	if (!error && !data) {
		return (
			987987
		);
	}

	if (error) {
		return (
			<ErrorPage error={ error } />
		);
	}

	if (data) {
		return (
			<Children initialData={ data } />
		);
	}
	//test
}

export default FetchCurrentLocation;
