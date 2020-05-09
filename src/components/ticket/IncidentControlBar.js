import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Validate } from '../../utils';
import { UserCtx } from '../../GlobalContext';
import * as SRC from '../../assets/icons';
import { TicketCtx, STATUS } from './TicketContext';

function IncidentControlBar() {

	const user = useContext(UserCtx);
	const Ticket = useContext(TicketCtx);

	const save = (e) => {
		const action = {};
		handleSubmit(e, action);
	};

	const escalate = (e) => {
		const action = { escalation: Ticket.state.escalation + 1 };
		handleSubmit(e, action);
	};

	const submit = (e) => {
		const action = { status: STATUS.QUEUED };
		handleSubmit(e, action);
	};

	const setInProgress = (e) => {
		const action = { status: STATUS.IN_PROGRESS };
		handleSubmit(e, action);
	};

	const placeOnHold = (e) => {
		const action = { status: STATUS.ON_HOLD };
		handleSubmit(e, action);
	};

	const resolve = (e) => {
		const action = { status: STATUS.RESOLVED };
		handleSubmit(e, action);
	};

	const reopen = (e) => {
		const action = { status: STATUS.IN_PROGRESS };
		handleSubmit(e, action);
	};

	const handleSubmit = (e, action) => {
		if (!Validate.state(Ticket.state)) {
			console.error('CANNOT SUBMIT INCOMPLETE FORM');
			return;
		}
		Ticket.form.setIsDisabled(true);
		Ticket.setNeedToSave(false);
		Ticket.setDataToPost({
			...Ticket.state,
			...action,
			user,
			date: Date.now()
		});
	};

	useEffect(() => {
		if (!Ticket.needToSave && Ticket.dataToPost) {
			console.log('Posting');
			Ticket.post();
		}
	}, [ Ticket.needToSave, Ticket.dataToPost ]);

	const status = Ticket.state.status;

	return (
		<IncidentControlBar$>

			{ status === STATUS.QUEUED || status === STATUS.IN_PROGRESS || status === STATUS.ON_HOLD ? (
				<PaperclipBtn$ onClick={ () => Ticket.attachments.setIsOpened(true) } />
			) : '' }

			{ status === 'new' ? (
				<button onClick={ submit }>
					Submit
				</button>
			) : '' }

			{ status === STATUS.QUEUED || status === STATUS.IN_PROGRESS || status === STATUS.ON_HOLD ? (
				<button onClick={ save }>
					Save
				</button>
			) : '' }

			{ status === STATUS.QUEUED || status === STATUS.IN_PROGRESS || status === STATUS.ON_HOLD ? (
				<button onClick={ escalate }>
					Escalate
				</button>
			) : '' }

			{ status === STATUS.QUEUED || status === STATUS.ON_HOLD ? (
				<button onClick={ setInProgress }>
					Set in progress
				</button>
			) : '' }

			{ status === STATUS.IN_PROGRESS ? (<>
				<button onClick={ placeOnHold }>
					Place on hold
				</button>

				<button onClick={ resolve }>
					Resolve
				</button>
			</>) : '' }

			{ status === STATUS.RESOLVED ? (
				<button onClick={ reopen }>
					Reopen
				</button>
			) : '' }


		</IncidentControlBar$>
	);
}

export default IncidentControlBar;

const IncidentControlBar$ = styled.div`
	display: flex;
	justify-content: flex-end;

	button {
		margin-top: 0;
	}
`;

const PaperclipBtn$ = styled.button`
	width: 2.2rem;
	background-image: ${ `url(${ SRC.paperclip })` };
	background-repeat: no-repeat;
	background-position: center;
	background-size: 25px;
`;
