import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Validate } from '../../utils';
import { baseURL } from '../../../baseURL';
import { UserCtx } from '../../Context';
import { UploadFile } from './';
import http from '../../utils/http';

function IncidentActions({ formControls: [ state, setState, form, needToSave, setNeedToSave ] }) {

	const shouldPost = useRef(false);
	const user = useContext(UserCtx);
	const hist = useHistory();

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
		form.current.classList.add('disabled');
		setNeedToSave(false);
		shouldPost.current = true;

		setState({
			...state,
			...action,
			user,
			date: Date.now()
		});
	};

	useEffect(() => {
		if (!needToSave && shouldPost.current) {
			shouldPost.current = false;
			http()
				.post(baseURL + hist.location.pathname, state)
				.then(res => hist.push('/ticket/' + res.id))
				.catch(error => {
					console.error(error);
					form.current.classList.remove('disabled');
				});
		}
	}, [ state, needToSave ]);


	return (
		<IncidentActions$>

			{ state.status === 'queued' || state.status === 'in progress' || state.status === 'on hold' ? (
				<UploadFile />
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
