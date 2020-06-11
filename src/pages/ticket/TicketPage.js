import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { requirements, Form, ControlBar, WorknotesHistory } from './';
import { useFormValidation, useToggle, useSubscription } from '../../hooks';
import { FlexCol$ } from '../../components/flex';
import { LocationPrompt } from '../../components/popup';
import { AttachmentPopup } from '../../components/attachments';
import { http } from '../../utils';
import { BASE_URL } from '/BASE_URL';
import { UserCtx } from '../../GlobalContext';
import { ItRoutesCtx } from '../../components/IT-routes/ItRoutesWithContext';
import { useSubmitTicket } from './helpers';

function TicketPage({ initialData: { worknotesHistory: initialWorknotesHistory, ...initialState } }) {

	const history = useHistory();
	const userCtx = useContext(UserCtx);
	const itRoutesCtx = useContext(ItRoutesCtx);
	const [ needToSave, setNeedToSave ] = useState(false);
	// const submitTicket = useSubmitTicket(setNeedToSave, itRoutesCtx, userCtx,);

	const {
		state,
		setState,
		errors,
		handleChange,
		validateSubmission
	} = useFormValidation({ requirements, initialState, getStateChanges, onValidSubmission: submitTicket });
	const [ worknotesHistory, setWorknotesHistory ] = useState(initialWorknotesHistory);
	const liveData = useSubscription(BASE_URL + location.pathname + '/subscribe');
	const [ isAttachmentPopupOpened, toggleAttachmentPopup ] = useToggle(false);

	useEffect(() => {
		if (!liveData) return;

		let { worknotesHistory, ...newState } = liveData;
		worknotesHistory && setWorknotesHistory(worknotesHistory);
		setState({ ...state, ...newState });
		// const changedProps = compare(liveData, ticketCtx.initialState);
		// ticketCtx.setChangedProps(changedProps);
	}, [ liveData ]);


	function submitTicket(e) {
		setNeedToSave(false);
		const additionalData = JSON.parse(e.target.value || '{}');
		additionalData.user = userCtx.name;
		additionalData.date = Date.now();
		additionalData.updatedOn = Date.now();
		itRoutesCtx.page.setIsLoading(true);

		setTimeout(() => {
			http()
				.post(BASE_URL + location.pathname, { ...state, ...additionalData })
				.then(() => history.push(location.pathname.split('/').slice(0, -1).join('/') + `/${ state.id }`))
				.catch(err => {
					console.log(err);
					itRoutesCtx.page.setIsLoading(false);
				});
		}, 200);
	}

	const deleteTicket = (e) => {
		itRoutesCtx.page.setIsLoading(true);
		setNeedToSave(false);

		http()
			.delete(BASE_URL + location.pathname, '')
			.then(res => {
				if (!res.deletedCount) console.error('Could not delete the ticket');
				const redirectURL = location.pathname.split('/').slice(0, -1).join('/');
				history.push(redirectURL);
			})
			.catch(err => {
				console.log(err);
				itRoutesCtx.page.setIsLoading(false);
			});
	};

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

