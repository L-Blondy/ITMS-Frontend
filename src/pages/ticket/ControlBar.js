import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { requirements, Form } from './';
import { ControlBar$ } from '../../components/navs';
import STATUS from './STATUS.json';
import { Button, ButtonDanger$, ButtonPaperclip$, ButtonControlBar$ } from '../../components/buttons';

function ControlBar({ toggleAttachmentPopup, deleteTicket, validateSubmission, state }) {

	const { status, escalation } = state;

	return (
		<ControlBar$>

			<Button
				styleAs={ ButtonDanger$ }
				className='delete-btn'
				isVisible={ status !== STATUS.NEW }
				warning={ { message: 'Do you want to delete this ticket ?' } }
				onConfirm={ deleteTicket } >
				Delete
			</Button>

			<div className='controls'>

				<Button
					styleAs={ ButtonPaperclip$ }
					className='paperclip-btn'
					isVisible={ status.isOneOf([ STATUS.QUEUED, STATUS.IN_PROGRESS, STATUS.ON_HOLD ]) }
					onClick={ toggleAttachmentPopup }
				/>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.QUEUED, STATUS.IN_PROGRESS, STATUS.ON_HOLD ]) }
					onClick={ validateSubmission } >
					Save
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.NEW ]) }
					value={ JSON.stringify({ status: STATUS.QUEUED }) }
					onClick={ validateSubmission } >
					Submit
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.QUEUED, STATUS.IN_PROGRESS, STATUS.ON_HOLD ]) }
					warning={ { message: 'Do you want to escalate this ticket ?' } }
					name='escalateName'
					value={ JSON.stringify({ escalation: escalation + 1 }) }
					onConfirm={ validateSubmission } >
					Escalate
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.QUEUED, STATUS.ON_HOLD ]) }
					value={ JSON.stringify({ status: STATUS.IN_PROGRESS }) }
					onClick={ validateSubmission } >
					Set in progress
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.IN_PROGRESS ]) }
					value={ JSON.stringify({ status: STATUS.ON_HOLD }) }
					onClick={ validateSubmission } >
					Place on hold
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.IN_PROGRESS ]) }
					value={ JSON.stringify({ status: STATUS.RESOLVED }) }
					onClick={ validateSubmission } >
					Resolve
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.RESOLVED ]) }
					value={ JSON.stringify({ status: STATUS.IN_PROGRESS }) }
					onClick={ validateSubmission } >
					Reopen
				</Button>
			</div>
		</ControlBar$>
	);
}

export default ControlBar;
