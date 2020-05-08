import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TicketRender } from './';
import { ErrorPage } from '../';
import { BASE_URL } from '../../../BASE_URL';
import http from '../../utils/http';

function TicketGet() {

	const [ serverData, setServerData ] = useState();
	const [ error, setError ] = useState();
	const [ key, setKey ] = useState(Math.random());
	const hist = useHistory();


	useEffect(() => {
		http()
			.get(BASE_URL + hist.location.pathname, hist.location.search)
			.then(res => setServerData(res))
			.catch(e => setError(e));
	}, [ hist.location ]);

	useEffect(() => {
		setKey(Math.random());
		console.log(serverData);
	}, [ serverData ]);

	if (error) {
		return (
			<ErrorPage error={ error } />
		);
	}
	if (serverData) {
		return (
			<TicketRender
				key={ key }
				serverData={ serverData }
			/>
		);
	}
	else {
		return (
			<h2>Loading...</h2>
		);
	}
}

export default TicketGet;