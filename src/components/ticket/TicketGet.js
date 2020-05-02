import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TicketRender } from './';
import { baseURL } from '../../../baseURL';
import { useGet } from '../../hooks';

function TicketGet() {

	const [ serverData, getData, err ] = useGet();
	const [ key, setKey ] = useState(Math.random());
	const hist = useHistory();

	useEffect(() => {
		getData(baseURL + hist.location.pathname, hist.location.search);
	}, [ hist.location ]);

	useEffect(() => {
		setKey(Math.random());
	}, [ serverData ]);


	if (serverData) {
		return <TicketRender key={ key } serverData={ serverData } />;
	}
	else {
		return <h2>Loading...</h2>;
	}
}

export default TicketGet;

