import styled from 'styled-components';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Validate } from '../../../utils';
import { UserCtx } from '../../../GlobalContext';
import { CLR } from '../../../GlobalStyles';
import * as SRC from '/assets/icons';
import { TicketCtx, STATUS } from './TicketPageWithContext';
import { ItRoutesCtx } from '../ItRoutesWithContext';
// import Button, { Button$ } from '../../Button';
import * as Button from '../../buttons';
import { ControlBar$ } from '../';
import { http } from '../../../utils';
import { BASE_URL } from '/BASE_URL';

console.log(typeof Button.Button);

function ControlBar() {

	const userCtx = useContext(UserCtx);
	const ticketCtx = useContext(TicketCtx);
	const itRoutesCtx = useContext(ItRoutesCtx);
	const params = useParams();
	const history = useHistory();

	const forceWorknote = () => {
		const noteInput = document.querySelector('#log');
		if (!noteInput.value) {
			noteInput.classList.add('invalid');
			return;
		}
		handleSubmit({ status: STATUS.RESOLVED });
	};

	const deleteTicket = () => {
		itRoutesCtx.page.setIsLoading(true);
		ticketCtx.setNeedToSave(false);
		http()
			.delete(BASE_URL + location.pathname, '')
			.then(res => {
				if (!res.deletedCount)
					console.error('Could not delete the ticket');
				const redirectURL = location.pathname.split('/').slice(0, -1).join('/');
				history.push(redirectURL);
			})
			.catch(err => console.log(err));
	};

	const handleSubmit = (action = {}) => {
		if (!Validate.state(ticketCtx.state)) {
			console.error('CANNOT SUBMIT INCOMPLETE FORM');
			return;
		}
		itRoutesCtx.page.setIsLoading(true);
		ticketCtx.setNeedToSave(false);
		ticketCtx.setDataToPost({
			...ticketCtx.state,
			...action,
			user: userCtx.name,
			date: Date.now(),
			updatedOn: Date.now()
		});
	};

	useEffect(() => {
		if (!ticketCtx.needToSave && ticketCtx.dataToPost) {
			http()
				.post(BASE_URL + location.pathname, ticketCtx.dataToPost)
				.then(res => {
					history.push(`/it/ticket/${ params.type }/${ res.id }`);
				})
				.catch(error => {
					console.error(error);
					itRoutesCtx.page.setIsLoading(false);
				});
		}
	}, [ ticketCtx.needToSave, ticketCtx.dataToPost ]);

	const status = ticketCtx.state.status;

	return (
		<ControlBar$>

			<Button.Button
				styleAs={ Button.Danger$ }
				className='delete-btn'
				isVisible={ status !== STATUS.NEW }
				warning={ { message: 'Do you want to delete this ticket ?' } }
				onConfirm={ deleteTicket } >
				Delete
			</Button.Button>

			<div className='controls'>

				<Button.Button
					styleAs={ Button.Paperclip$ }
					className='paperclip-btn'
					isVisible={ status.isOneOf([ STATUS.QUEUED, STATUS.IN_PROGRESS, STATUS.ON_HOLD ]) }
					onClick={ () => ticketCtx.attachments.setIsOpened(true) }
				/>

				<Button.Button
					styleAs={ Button.ControlBar$ }
					isVisible={ status.isOneOf([ STATUS.QUEUED, STATUS.IN_PROGRESS, STATUS.ON_HOLD ]) }
					onClick={ () => handleSubmit() } >
					Save
				</Button.Button>

				<Button.Button
					styleAs={ Button.ControlBar$ }
					isVisible={ status.isOneOf([ STATUS.NEW ]) }
					onClick={ () => handleSubmit({ status: STATUS.QUEUED }) } >
					Submit
				</Button.Button>

				<Button.Button
					styleAs={ Button.ControlBar$ }
					isVisible={ status.isOneOf([ STATUS.QUEUED, STATUS.IN_PROGRESS, STATUS.ON_HOLD ]) }
					warning={ { message: 'Do you want to escalate this ticket ?' } }
					onConfirm={ () => handleSubmit({ escalation: ticketCtx.state.escalation + 1 }) } >
					Escalate
				</Button.Button>

				<Button.Button
					styleAs={ Button.ControlBar$ }
					isVisible={ status.isOneOf([ STATUS.QUEUED, STATUS.ON_HOLD ]) }
					onClick={ () => handleSubmit({ status: STATUS.IN_PROGRESS }) } >
					Set in progress
				</Button.Button>

				<Button.Button
					styleAs={ Button.ControlBar$ }
					isVisible={ status.isOneOf([ STATUS.IN_PROGRESS ]) }
					onClick={ () => handleSubmit({ status: STATUS.ON_HOLD }) } >
					Place on hold
				</Button.Button>

				<Button.Button
					styleAs={ Button.ControlBar$ }
					isVisible={ status.isOneOf([ STATUS.IN_PROGRESS ]) }
					onClick={ () => forceWorknote() } >
					Resolve
				</Button.Button>

				<Button.Button
					styleAs={ Button.ControlBar$ }
					isVisible={ status.isOneOf([ STATUS.RESOLVED ]) }
					onClick={ () => handleSubmit({ status: STATUS.IN_PROGRESS }) } >
					Reopen
				</Button.Button>
			</div>
		</ControlBar$>
	);
}

export default ControlBar;

const PaperclipBtn$ = styled.button`
	width: 2.2rem;
	background-image: ${ `url(${ SRC.paperclip })` };
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	background-color: transparent !important;
	height: 100%;
	margin: 0 0.5rem !important;
	padding: 0 1.5rem !important;
	box-shadow: none !important;
	
	&:hover {
		filter: blur(0.5px);
		opacity: 0.65;
	}
`;

const Delete$ = styled.button`
	box-shadow: none;
	background: #dd3131;
	box-shadow: 0 0 0 1px #dd3131;
	color: white;
	padding: 0 0.8rem;
	border-radius: 1px;
	font-weight: bold;

	&:hover {
		opacity: 0.66;
	}
`;

