import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { requirements, Form, ControlBar, WorknotesHistory, AttachmentBox } from './';
import { useFormValidation, useToggle } from '../../hooks';
import { http } from '../../utils';
import { BASE_URL } from '/BASE_URL';
import { UserCtx } from '../../GlobalContext';

function TicketPage({ initialData: { worknotesHistory: initialWorknotesHistory, ...initialState } }) {

	const {
		state,
		setState,
		errors,
		handleChange,
		validateSubmission
	} = useFormValidation({ requirements, initialState, getStateChanges, onValidSubmission });
	const [ worknotesHistory, setWorknotesHistory ] = useState(initialWorknotesHistory);
	const [ isAttachmentBoxOpened, toggleAttachments ] = useToggle(false);
	const history = useHistory();
	const userCtx = useContext(UserCtx);

	function onValidSubmission(e) {
		const additionalData = JSON.parse(e.target.value || '{}');
		additionalData.user = userCtx.name;
		additionalData.date = Date.now();
		additionalData.updatedOn = Date.now();

		http()
			.post(BASE_URL + location.pathname, { ...state, ...additionalData })
			.then(() => history.push(location.pathname))
			.catch(err => console.log(err));
	}

	const deleteTicket = (e) => { };
	useEffect(() => console.log(isAttachmentBoxOpened), [ isAttachmentBoxOpened ]);

	return (<>
		<AttachmentBox
			when={ isAttachmentBoxOpened }
			toggleSelf={ toggleAttachments }
		/>

		<ControlBar
			state={ state }
			toggleAttachments={ toggleAttachments }
			deleteTicket={ deleteTicket }
			validateSubmission={ validateSubmission }
		/>

		<Form
			state={ state }
			errors={ errors }
			handleChange={ handleChange }
			validateSubmission={ validateSubmission }
		/>

		<WorknotesHistory
			worknotesHistory={ worknotesHistory }
			state={ state }
		/>

	</>);
}

export default TicketPage;

function getStateChanges(state, name, value) {
	const changes = { [ name ]: value };
	if (name === 'category')
		changes.subCategory = '';
	if (name === 'impact')
		changes.priority = 'P' + Math.floor((parseInt(state.urgency) + parseInt(value)) / 2);
	if (name === 'urgency')
		changes.priority = 'P' + Math.floor((parseInt(state.impact) + parseInt(value)) / 2);
	return changes;
};

