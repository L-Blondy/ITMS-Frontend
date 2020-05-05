import React, { useEffect, useState, useRef } from 'react';
import { useHistory, Prompt } from 'react-router-dom';
import { TicketRender } from './';
import { baseURL } from '../../../baseURL';
import http from '../../utils/http';

function TicketGet () {

	const [ serverData, setServerData ] = useState()
	const [ key, setKey ] = useState( Math.random() );
	const hist = useHistory();


	useEffect( () => {
		http()
			.get( baseURL + hist.location.pathname, hist.location.search )
			.then( res => setServerData( res ) )
			.catch( e => console.log( e ) )
	}, [ hist.location ] );

	useEffect( () => {
		setKey( Math.random() );
	}, [ serverData ] );


	if ( serverData ) {
		return (
			<TicketRender
				key={ key }
				serverData={ serverData }
			/>
		);
	}
	else {
		return <h2>Loading...</h2>;
	}
}

export default TicketGet;