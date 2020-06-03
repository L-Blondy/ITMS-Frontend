import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { requirements, Form, ControlBar, STATUS } from './';
import { Validation, formatDate, formatPriority } from '../../utils';
import { ControlBar$ } from '../../components/navs';
import { useHistory, useParams } from 'react-router-dom';
import { Validate } from '../../utils';
import { UserCtx } from '../../GlobalContext';
import { CLR } from '../../GlobalStyles';
import * as SRC from '/assets/icons';
import { ItRoutesCtx } from '../../components/IT-routes/ItRoutesWithContext';
import { Button, ButtonDanger$, ButtonPaperclip$, ButtonControlBar$ } from '../../components/buttons';
import { http } from '../../utils';
import { BASE_URL } from '/BASE_URL';

function TicketPage({ initialData: { worknotesHistory: initialWorknotesHistory, ...initialState } }) {

	const form = useRef();
	const [ state, setState ] = useState(initialState);
	const [ worknotesHistory, setWorknotesHistory ] = useState(initialWorknotesHistory);

	const handleChange = (e) => { };
	const deleteTicket = (e) => { };
	const submitTicket = (e) => { };
	const toggleAttachments = (e) => { };

	const formValidation = new Validation(form, requirements);

	const handleSubmit = (e) => {
		const action = JSON.parse(e.target.value || '{}');
		formValidation.validateElements();
	};



	return (<>

		<ControlBar
			state={ state }
			toggleAttachments={ toggleAttachments }
			deleteTicket={ deleteTicket }
			handleSubmit={ handleSubmit }
		/>

		<Form
			ref={ form }
			validation={ formValidation }
			initialState={ initialState }
		/>

	</>);
}

export default TicketPage;

