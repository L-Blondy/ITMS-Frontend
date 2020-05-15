import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Validate } from '../../../utils';
import { UserCtx } from '../../../GlobalContext';
import * as SRC from '../../../assets/icons';
import { TicketCtx, STATUS } from './TicketPageWithContext';
import { DeleteTicket } from './';

function IncidentControlBar() {

	const user = useContext(UserCtx);
	const ticketCtx = useContext(TicketCtx);

	const promptUser = () => ticketCtx.escalation.setIsWarning(true);

	useEffect(() => {
		if (!ticketCtx.escalation.isConfirmed)
			return;

		handleSubmit({ escalation: ticketCtx.state.escalation + 1 });
	}, [ ticketCtx.escalation.isConfirmed ]);

	const forceWorknote = () => {
		const noteInput = document.querySelector('#log');
		if (!noteInput.value) {
			noteInput.classList.add('invalid');
			return;
		}
		handleSubmit({ status: STATUS.RESOLVED });
	};

	const handleSubmit = (action = {}) => {
		if (!Validate.state(ticketCtx.state)) {
			console.error('CANNOT SUBMIT INCOMPLETE FORM');
			return;
		}
		ticketCtx.escalation.setIsConfirmed(false);
		ticketCtx.page.setIsDisabled(true);
		ticketCtx.setNeedToSave(false);
		ticketCtx.setDataToPost({
			...ticketCtx.state,
			...action,
			user,
			date: Date.now()
		});
	};

	useEffect(() => {
		if (!ticketCtx.needToSave && ticketCtx.dataToPost) {
			ticketCtx.post();
		}
	}, [ ticketCtx.needToSave, ticketCtx.dataToPost ]);

	const status = ticketCtx.state.status;

	return (
		<ControlBar$>

			<DeleteTicket
				when={ status !== STATUS.NEW }
			/>

			<Button
				as={ PaperclipBtn$ }
				when={ status === STATUS.QUEUED || status === STATUS.IN_PROGRESS || status === STATUS.ON_HOLD }
				onClick={ () => ticketCtx.attachments.setIsOpened(true) }
			/>

			<Button
				name='Save'
				when={ status === STATUS.QUEUED || status === STATUS.IN_PROGRESS || status === STATUS.ON_HOLD }
				onClick={ () => handleSubmit() }
			/>

			<Button
				name='Submit'
				when={ status === STATUS.NEW }
				onClick={ () => handleSubmit({ status: STATUS.QUEUED }) }
			/>

			<Button
				name='Escalate'
				when={ status === STATUS.QUEUED || status === STATUS.IN_PROGRESS || status === STATUS.ON_HOLD }
				onClick={ () => promptUser() }
			/>

			<Button
				name='Set in progress'
				when={ status === STATUS.QUEUED || status === STATUS.ON_HOLD }
				onClick={ () => handleSubmit({ status: STATUS.IN_PROGRESS }) }
			/>

			<Button
				name='Place on hold'
				when={ status === STATUS.IN_PROGRESS }
				onClick={ () => handleSubmit({ status: STATUS.ON_HOLD }) }
			/>

			<Button
				name='Resolve'
				when={ status === STATUS.IN_PROGRESS }
				onClick={ () => forceWorknote() }
			/>

			<Button
				name='Reopen'
				when={ status === STATUS.RESOLVED }
				onClick={ () => handleSubmit({ status: STATUS.IN_PROGRESS }) }
			/>

		</ControlBar$>
	);
}

export default IncidentControlBar;

function Button({ onClick, name = '', when, as }) {
	if (!when)
		return null;

	const Style = as || 'button';

	return (
		<Style onClick={ onClick } className='control-button'>
			{ name }
		</Style>
	);
}

const ControlBar$ = styled.div`
	display: flex;
	justify-content: flex-end;
	background-color: #c6d2d3;
	padding: 0.5rem 1rem 0.5rem 0.8rem;

	.control-button {
		margin-left: 0.5rem;
		padding: 0.15rem 0.8rem;
		background-color: #f4f4f4;
		border-radius: 2px;
		color: #295257;
		font-size: 0.95em;
		box-shadow: 0 0 0 1px #a6c3c6;

		&:hover{
			background-color: white;
			color: #666;
		}
	}
`;

const PaperclipBtn$ = styled.button`
	width: 2.2rem;
	background-image: ${ `url(${ SRC.paperclip })` };
	background-repeat: no-repeat;
	background-position: center;
	background-size: 25px;
	background-color: transparent !important;
	margin: 0 0.5rem !important;
	padding: 0 1.5rem !important;
	box-shadow: none !important;
	
	&:hover {
		filter: blur(0.5px);
		opacity: 0.65;
	}
`;
