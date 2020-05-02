import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useInputValidation, useSubscription } from '../../hooks';
import { IncidentFields, IncidentActions, WorknotesHistory } from './';
import { baseURL } from '../../../baseURL';


function TicketRender({ serverData }) {

	const { worknotesHistory, ...formData } = serverData;
	const location = useLocation();
	const liveData = useSubscription(baseURL + location.pathname + '/subscribe');
	// const liveData = serverData;
	const [ worknotesHistoryData, setWorknotesHistoryData ] = useState(worknotesHistory);
	const [ state, handleChange ] = useInputValidation(formData);
	const form = useRef();

	useEffect(() => {
		liveData && setWorknotesHistoryData(liveData.worknotesHistory);
		console.log('LIVEDATA', liveData);
		compare(liveData, serverData);
	}, [ liveData ]);

	useEffect(() => {
		console.log('SERVERDATA', serverData);
	}, [ serverData ]);

	return (
		<>
			<IncidentActions formControls={ [ state, handleChange, form ] } />

			{ formData.id.slice(0, 3) === 'INC' ? (
				<IncidentFields formControls={ [ state, handleChange, form ] } />
			) : formData.id.slice(0, 3) === 'REQ' ? (
				<IncidentFields formControls={ [ state, handleChange, form ] } />
			) : formData.id.slice(0, 3) === 'CHG' ? (
				<IncidentFields formControls={ [ state, handleChange, form ] } />
			) : '' }

			<WorknotesHistory worknotesHistory={ worknotesHistoryData || worknotesHistory } />
		</>
	);
}

export default TicketRender;

function compare(liveData, serverData) {
	for (let prop in serverData) {
		const servVal = serverData[ prop ];
		const liveVal = liveData[ prop ];

		if (prop[ 0 ] === '_')
			continue;

		if (liveVal && prop === 'worknotesHistory') {
			if (servVal.length !== liveVal.length) {
				console.log('%c' + (liveVal.length - servVal.length) + ' worknotes were added', 'background: #222; color: #bada55');
			}
		}
		else if (liveVal && servVal !== liveVal) {
			console.log('%c' + prop + ': changed from ' + servVal + ' to ' + liveVal, 'background: #222; color: #bada55');
		}
	}
}




