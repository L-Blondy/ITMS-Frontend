import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { requirements, Fields, ControlBar, FileList, WorknotesHistory } from './';
import { useFormValidation, useToggle, useSubscription } from '../../../hooks';
import { FlexCol$ } from '../../../components/flex';
import { LocationPrompt } from '../../../components/popup';
import { AttachmentPopup } from '../../../components/attachments';
import { ItRoutesCtx } from '../ItRoutesContext';
import { BASE_URL } from '/BASE_URL';
import { useSubmitTicket, useDeleteTicket } from './helpers';
import { compareObjects } from '../../../utils';
import { withInitialFetch, withPreloader, withLocationMount } from '../../../higher-order';
import { ItPageContainer$$ } from '../../../components/containers';

function TicketPage({ setIsLoading, isLoading, Preloader, initialData: { worknotesHistory: initialWorknotesHistory, ...initialState } }) {

	const {
		state,
		setState,
		errors,
		handleChange,
		validateSubmission,
		submission
	} = useFormValidation({ requirements, initialState, getStateChanges });
	const [ worknotesHistory, setWorknotesHistory ] = useState(initialWorknotesHistory.reverse());
	const liveData = useSubscription(BASE_URL + location.pathname + '/subscribe');
	const [ isAttachmentPopupOpened, toggleAttachmentPopup ] = useToggle(false);
	const [ needToSave, setNeedToSave ] = useState(false);
	const submitTicket = useSubmitTicket(setNeedToSave, state, setIsLoading);
	const deleteTicket = useDeleteTicket(setNeedToSave, setIsLoading);
	const [ changedFields, setChangedFields ] = useState(new Set());

	useEffect(() => {
		if (!submission.isValid) return;
		submitTicket(submission.source);
	}, [ submission ]);

	useEffect(() => {
		if (!liveData) return;
		let { worknotesHistory, ...newState } = liveData;
		worknotesHistory && setWorknotesHistory(worknotesHistory.reverse());
		setState({ ...state, ...newState });
		let changes = compareObjects(liveData, initialState);
		changes = changes.filter(prop => !prop.isOneOf([ '__v', 'worknotesHistory', 'fileList', 'updatedOn' ]));
		changes = new Set(changes);
		setChangedFields(changes);
	}, [ liveData ]);

	useEffect(() => {
		if (state !== initialState && !isLoading) {
			setNeedToSave(true);
		};
	}, [ state ]);

	return (
		<>
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
			<ItPageContainer$$>

				<ControlBar
					state={ state }
					toggleAttachmentPopup={ toggleAttachmentPopup }
					deleteTicket={ deleteTicket }
					validateSubmission={ validateSubmission }
				/>

				<Preloader />

				<FileList fileList={ state.fileList } />

				<Container$>

					<FlexCol$$>
						<Fields
							state={ state }
							errors={ errors }
							handleChange={ handleChange }
							validateSubmission={ validateSubmission }
							changedFields={ changedFields }
						/>

						<WorknotesHistory
							worknotesHistory={ worknotesHistory }
							fileList={ state.fileList }
						/>
					</FlexCol$$>
				</Container$>

			</ItPageContainer$$>
		</>
	);
}

export default withLocationMount(withPreloader(withInitialFetch(TicketPage)));

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

