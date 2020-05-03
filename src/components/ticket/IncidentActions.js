import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Validate } from '../../utils';
import { usePost } from '../../hooks';
import { baseURL } from '../../../baseURL';
import { UserCtx } from '../../Context';
import { UploadFile } from './';
import http from '../../utils/http';

function IncidentActions({ formControls: [ state, , form ] }) {

	const [ response, post, postError ] = usePost('');
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

		const data = {
			...state,
			...action,
			user,
			date: Date.now()
		};
		console.log('SUBMITTING DATA', data);

		// setTimeout(() => post(baseURL + hist.location.pathname, data), 500);
		http()
			.post(baseURL + hist.location.pathname, data)
			.then(res => hist.push('/ticket/' + res.id))
			.catch(e => console.log(e));
	};

	useEffect(() => {
		// console.log(postError);
		form.current.classList.remove('disabled');
	}, [ postError ]);

	useEffect(() => {
		if (response) {
			console.log('Posted with success', response);
			hist.push('/ticket/' + response.id);
		}
	}, [ response ]);

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
