import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { requirements, Form, ControlBar, WorknotesHistory } from './';
import { useFormValidation, useToggle, useSubscription } from '../../hooks';
import { FlexCol$ } from '../../components/flex';
import { LocationPrompt } from '../../components/popup';
import { AttachmentPopup } from '../../components/attachments';
import { BASE_URL } from '/BASE_URL';
import { ItRoutesCtx } from '../../components/IT-routes/ItRoutesWithContext';
import { useSubmitTicket, useDeleteTicket } from './helpers';

function TicketPage({ initialData: { worknotesHistory: initialWorknotesHistory, ...initialState } }) {

	const {
		state,
		setState,
		errors,
		handleChange,
		validateSubmission,
		submission
	} = useFormValidation({ requirements, initialState, getStateChanges });
	const [ worknotesHistory, setWorknotesHistory ] = useState(initialWorknotesHistory);
	const liveData = useSubscription(BASE_URL + location.pathname + '/subscribe');
	const [ isAttachmentPopupOpened, toggleAttachmentPopup ] = useToggle(false);
	const itRoutesCtx = useContext(ItRoutesCtx);
	const [ needToSave, setNeedToSave ] = useState(false);
	const submitTicket = useSubmitTicket(setNeedToSave, state);
	const deleteTicket = useDeleteTicket(setNeedToSave);

	useEffect(() => {
		if (!submission.isValid) return;
		submitTicket(submission.source);
	}, [ submission ]);

	useEffect(() => {
		if (!liveData) return;

		let { worknotesHistory, ...newState } = liveData;
		worknotesHistory && setWorknotesHistory(worknotesHistory);
		setState({ ...state, ...newState });
		// const changedProps = compare(liveData, ticketCtx.initialState);
		// ticketCtx.setChangedProps(changedProps);
	}, [ liveData ]);

	useEffect(() => {
		if (state !== initialState && !itRoutesCtx.page.isLoading) {
			setNeedToSave(true);
		};
	}, [ state ]);

	return (<>
		<LocationPrompt
			when={ needToSave }
			message={ 'Modifications may not be saved.' }
			reason={ 'Do you want to exit this page ?' }
		/>

		<AttachmentPopup
			when={ isAttachmentPopupOpened }
			close={ toggleAttachmentPopup }
			fileList={ state.fileList }
		/>

		<ControlBar
			state={ state }
			toggleAttachmentPopup={ toggleAttachmentPopup }
			deleteTicket={ deleteTicket }
			validateSubmission={ validateSubmission }
		/>

		<Container$>
			<FlexCol$$>
				<Form
					state={ state }
					errors={ errors }
					handleChange={ handleChange }
					validateSubmission={ validateSubmission }
				/>

				<WorknotesHistory
					worknotesHistory={ worknotesHistory }
					fileList={ state.fileList }
				/>
			</FlexCol$$>
		</Container$>
	</>);
}

export default TicketPage;

function getStateChanges(name, value, state) {
	const changes = { [ name ]: value };
	if (name === 'category')
		changes.subCategory = '';
	if (name === 'impact')
		changes.priority = 'P' + Math.floor((parseInt(state.urgency) + parseInt(value)) / 2);
	if (name === 'urgency')
		changes.priority = 'P' + Math.floor((parseInt(state.impact) + parseInt(value)) / 2);
	return changes;
};

const Container$ = styled.div`
	overflow: auto;
	flex-grow: 1;
	position: relative;
`;

const FlexCol$$ = styled(FlexCol$)`
	width: 70%;
	margin: 0 auto;
`;

