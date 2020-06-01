import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { requirements, Form } from './';
import { Validation, formatDate, formatPriority } from '../../utils';
import { Row$, Col12md6$ } from '../../components/grid';
import { Nav, ControlBar$ } from '../../components/navs';


function TicketPage({ initialData: { worknotesHistory: initialWorknotesHistory, ...initialState } }) {

	const [ state, setState ] = useState(initialState);
	const [ worknotesHistory, setWorknotesHistory ] = useState(initialWorknotesHistory);

	const handleChange = (e) => { };

	const validation = new Validation(requirements);

	useEffect(() => {
		console.log(worknotesHistory, state);
	}, []);

	return (<>

		<Nav styleAs={ ControlBar$ } >
			ControlBar
		</Nav>

		<Form initialState={ initialState } />

	</>);
}

export default TicketPage;

