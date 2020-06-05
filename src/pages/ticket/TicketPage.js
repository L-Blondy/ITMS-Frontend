import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { requirements, Form, ControlBar, WorknotesHistory, AttachmentBox } from './';
import { useFormValidation, useToggle } from '../../hooks';
import { FlexCol$ } from '../../components/flex';
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
			.then(() => history.push(location.pathname.split('/').slice(0, -1).join('/') + `/${ state.id }`))
			.catch(err => console.log(err));
	}

	const deleteTicket = (e) => { };

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

