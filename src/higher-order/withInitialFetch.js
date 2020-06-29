import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { http } from '../utils';
import { BASE_URL } from '/BASE_URL';

function withInitialFetch(Target, query) {

	return function (props) {
		const [ error, setError ] = useState();
		const [ data, setData ] = useState();
		const [ key, setKey ] = useState(Math.random());
		const location = useLocation();

		useEffect(() => {
			setKey(Math.random());
			setData();
			setError();

			setTimeout(() => {
				http()
					.get(BASE_URL + location.pathname, query)
					.then(res => setData(res))
					.catch(e => setError(e));
			}, 1000);
		}, [ location ]);

		if (!error && !data) {
			return (
				<div>Loading...</div>
			);
		}
		if (error) {
			return (
				<div>Error...</div>
			);
		}
		return (
			<Target
				{ ...props }
				key={ key }
				initialData={ data }
			/>
		);
	};
}

export default withInitialFetch;