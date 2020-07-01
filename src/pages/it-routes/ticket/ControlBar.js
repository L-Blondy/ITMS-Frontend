import React from 'react';
import { ControlBar$ } from '../../../components/navs';
import { Button, ButtonDanger$, ButtonPaperclip$, ButtonControlBar$ } from '../../../components/buttons';
import STATUS from './STATUS.json';

function ControlBar({ deleteTicket, state, ...props }) {

	const { status, escalation } = state;

	const handleClick = (e) => {
		const action = e.target.dataset.action;
		if (!action) return;
		props[ action ](e);
	};

	return (
		<ControlBar$ onClick={ handleClick }>

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
					data-action='toggleAttachmentPopup'
					data-test={ { a: 1 } }
				/>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.QUEUED, STATUS.IN_PROGRESS, STATUS.ON_HOLD ]) }
					data-action='validateSubmission'>
					Save
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.NEW ]) }
					value={ JSON.stringify({ status: STATUS.QUEUED }) }
					data-action='validateSubmission'>
					Submit
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.QUEUED, STATUS.IN_PROGRESS, STATUS.ON_HOLD ]) }
					warning={ { message: 'Do you want to escalate this ticket ?' } }
					name='escalateName'
					value={ JSON.stringify({ escalation: escalation + 1 }) }
					data-action='validateSubmission' >
					Escalate
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.QUEUED, STATUS.ON_HOLD ]) }
					value={ JSON.stringify({ status: STATUS.IN_PROGRESS }) }
					data-action='validateSubmission' >
					Set in progress
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.IN_PROGRESS ]) }
					value={ JSON.stringify({ status: STATUS.ON_HOLD }) }
					data-action='validateSubmission' >
					Place on hold
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.IN_PROGRESS ]) }
					value={ JSON.stringify({ status: STATUS.RESOLVED }) }
					data-action='validateSubmission'>
					Resolve
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.RESOLVED ]) }
					value={ JSON.stringify({ status: STATUS.IN_PROGRESS }) }
					data-action='validateSubmission'>
					Reopen
				</Button>
			</div>
		</ControlBar$>
	);
}

export default ControlBar;
