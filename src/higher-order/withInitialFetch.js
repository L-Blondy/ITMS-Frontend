import React, { useEffect, useState } from 'react';
import { http } from '../utils';
import { BASE_URL } from '/BASE_URL';

function withInitialFetch(Target) {

	return function (props) {
		const [ error, setError ] = useState();
		const [ data, setData ] = useState();
		const [ key, setKey ] = useState(Math.random());

		useEffect(() => {
			setKey(Math.random());
			setData();
			setError();

			setTimeout(() => {
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
			}, 1000);
		}, [ location.pathname ]);

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
		return <Target { ...props } key={ key } initialData={ data } />;
	};
}

export default withInitialFetch;