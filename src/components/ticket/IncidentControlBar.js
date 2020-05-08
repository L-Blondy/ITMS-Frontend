import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Validate } from '../../utils';
import { BASE_URL } from '../../../BASE_URL';
import { UserCtx } from '../../GlobalContext';
import { PaperClipBtn } from './AttachmentView';
import http from '../../utils/http';

function IncidentActions({ formControls: [ state, setIsDisabled, needToSave, setNeedToSave, setIsAttachOpened ] }) {

	const user = useContext(UserCtx);
	const hist = useHistory();
	const [ dataToPost, setDataToPost ] = useState();

	const save = (e) => {
		const action = {};
		handleSubmit(e, action);
	};

	const escalate = (e) => {
		const action = { escalation: state.escalation + 1 };
		handleSubmit(e, action);
	};

	const submit = (e) => {
		const action = { status: 'queued' };
		handleSubmit(e, action);
	};

	const setInProgress = (e) => {
		const action = { status: 'in progress' };
		handleSubmit(e, action);
	};

	const placeOnHold = (e) => {
		const action = { status: 'on hold' };
		handleSubmit(e, action);
	};

	const resolve = (e) => {
		const action = { status: 'resolved' };
		handleSubmit(e, action);
	};

	const reopen = (e) => {
		const action = { status: 'in progress' };
		handleSubmit(e, action);
	};

	const handleSubmit = (e, action) => {
		if (!Validate.state(state)) {
			console.error('CANNOT SUBMIT INCOMPLETE FORM');
			return;
		}
		setIsDisabled(true);
		setNeedToSave(false);
		setDataToPost({
			...state,
			...action,
			user,
			date: Date.now()
		});
	};

	useEffect(() => {
		if (dataToPost && !needToSave) {
			http()
				.post(BASE_URL + hist.location.pathname, dataToPost)
				.then(res => hist.push('/ticket/' + res.id))
				.catch(error => {
					console.error(error);
					setIsDisabled(false);
				});
		}
	}, [ dataToPost, needToSave ]);

	return (
		<IncidentActions$>

			{ state.status === 'queued' || state.status === 'in progress' || state.status === 'on hold' ? (
				<PaperClipBtn onClick={ () => setIsAttachOpened(true) } />
			) : '' }

			{ state.status === 'new' ? (
				<button onClick={ submit }>
					Submit
				</button>
			) : '' }

			{ state.status === 'queued' || state.status === 'in progress' || state.status === 'on hold' ? (
				<button onClick={ save }>
					Save
				</button>
			) : '' }

			{ state.status === 'queued' || state.status === 'in progress' || state.status === 'on hold' ? (
				<button onClick={ escalate }>
					Escalate
				</button>
			) : '' }

			{ state.status === 'queued' || state.status === 'on hold' ? (
				<button onClick={ setInProgress }>
					Set in progress
				</button>
			) : '' }

			{ state.status === 'in progress' ? (<>
				<button onClick={ placeOnHold }>
					Place on hold
				</button>

				<button onClick={ resolve }>
					Resolve
				</button>
			</>) : '' }

			{ state.status === 'resolved' ? (
				<button onClick={ reopen }>
					Reopen
				</button>
			) : '' }


		</IncidentActions$>
	);
}

export default IncidentActions;

const IncidentActions$ = styled.div`
	display: flex;
	justify-content: flex-end;

	button {
		margin-top: 0;
	}
`;
