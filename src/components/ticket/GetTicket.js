import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TicketPage } from './';
import { ErrorPage } from '../';
import { BASE_URL } from '../../../BASE_URL';
import http from '../../utils/http';
import TicketContext from './TicketContext';

function GetTicket() {

	const [ initialData, setInitialData ] = useState();
	const [ error, setError ] = useState();
	const [ key, setKey ] = useState(Math.random());
	const hist = useHistory();


	useEffect(() => {
		http()
			.get(BASE_URL + hist.location.pathname, hist.location.search)
			.then(res => setInitialData(res))
			.catch(e => setError(e));
	}, [ hist.location ]);

	useEffect(() => {
		setKey(Math.random());
	}, [ initialData ]);

	if (error) {
		return (
			<ErrorPage error={ error } />
		);
	}
	if (initialData) {
		return (
			<TicketContext key={ key } initialData={ initialData }>
				<TicketPage serverData={ initialData } />
			</TicketContext>
		);
	}
	else {
		return (
			<h2>Loading...</h2>
		);
	}
}

export default GetTicket;