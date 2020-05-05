import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useInputValidation, useSubscription } from '../../hooks';
import { IncidentFields, IncidentActions, WorknotesHistory } from './';
import { baseURL } from '../../../baseURL';

function TicketRender ( { serverData } ) {

	let { worknotesHistory, ...formData } = serverData;
	const location = useLocation();
	const liveData = useSubscription( baseURL + location.pathname + '/subscribe' );
	const [ worknotesHistoryData, setWorknotesHistoryData ] = useState( worknotesHistory );
	const [ state, handleChange, setState ] = useInputValidation( formData );
	const form = useRef();

	useEffect( () => {
		if ( liveData ) {
			let { worknotesHistory, ...formData } = liveData;
			setWorknotesHistoryData( worknotesHistory );
			setState( { ...state, ...formData } )
			compare( liveData, serverData );
		}
	}, [ liveData ] );


	return (
		<>
			<IncidentActions formControls={ [ state, handleChange, form ] } />

			{ formData.id.slice( 0, 3 ) === 'INC' ? (
				<IncidentFields formControls={ [ state, handleChange, form ] } />
			) : formData.id.slice( 0, 3 ) === 'REQ' ? (
				<IncidentFields formControls={ [ state, handleChange, form ] } />
			) : formData.id.slice( 0, 3 ) === 'CHG' ? (
				<IncidentFields formControls={ [ state, handleChange, form ] } />
			) : '' }

			<WorknotesHistory worknotesHistory={ worknotesHistoryData || worknotesHistory } />

		</>
	);
}

export default TicketRender;

function compare ( liveData, serverData ) {
	for ( let prop in serverData ) {
		const servVal = serverData[ prop ];
		const liveVal = liveData[ prop ];

		if ( prop[ 0 ] === '_' )
			continue;

		if ( liveVal && prop === 'worknotesHistory' ) {
			if ( servVal.length !== liveVal.length ) {
				console.log( '%c' + ( liveVal.length - servVal.length ) + ' worknotes were added', 'background: #222; color: #bada55' );
			}
		}
		else if ( liveVal && servVal !== liveVal ) {
			console.log( '%c' + prop + ': changed from ' + servVal + ' to ' + liveVal, 'background: #222; color: #bada55' );
		}
	}
}




