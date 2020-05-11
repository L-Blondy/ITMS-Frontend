import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Validate } from '../../../utils';
import { UserCtx } from '../../../GlobalContext';
import * as SRC from '../../../assets/icons';
import { TicketCtx, STATUS } from './TicketPageWithContext';

function IncidentControlBar() {

	const user = useContext(UserCtx);
	const ticketCtx = useContext(TicketCtx);

	const promptUser = () => ticketCtx.escalation.setIsWarning(true);

	useEffect(() => {
		if (!ticketCtx.escalation.isConfirmed)
			return;

		handleSubmit({ escalation: ticketCtx.state.escalation + 1 });
	}, [ ticketCtx.escalation.isConfirmed ]);

	const handleSubmit = (action = {}) => {
		if (!Validate.state(ticketCtx.state)) {
			console.error('CANNOT SUBMIT INCOMPLETE FORM');
			return;
		}
		ticketCtx.escalation.setIsConfirmed(false);
		ticketCtx.form.setIsDisabled(true);
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
		<IncidentControlBar$>

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
				onClick={ () => handleSubmit({ status: STATUS.RESOLVED }) }
			/>

			<Button
				name='Reopen'
				when={ status === STATUS.RESOLVED }
				onClick={ () => handleSubmit({ status: STATUS.IN_PROGRESS }) }
			/>

		</IncidentControlBar$>
	);
}

export default IncidentControlBar;

function Button({ onClick, name = '', when, as }) {

	const Style = as || 'button';

	if (!when)
		return null;

	return (
		<Style onClick={ onClick }>
			{ name }
		</Style>
	);
}

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
