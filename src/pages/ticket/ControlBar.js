import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { requirements, Form } from './';
import { Validation, formatDate, formatPriority } from '../../utils';
import { ControlBar$ } from '../../components/navs';
import { useHistory, useParams } from 'react-router-dom';
import { Validate } from '../../utils';
import { UserCtx } from '../../GlobalContext';
import { CLR } from '../../GlobalStyles';
import * as SRC from '/assets/icons';
import STATUS from './STATUS.json';
import { ItRoutesCtx } from '../../components/IT-routes/ItRoutesWithContext';
import { Button, ButtonDanger$, ButtonPaperclip$, ButtonControlBar$ } from '../../components/buttons';
import { http } from '../../utils';
import { BASE_URL } from '/BASE_URL';

function ControlBar({ toggleAttachments, deleteTicket, handleSubmit, state }) {

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
					onClick={ toggleAttachments }
				/>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.QUEUED, STATUS.IN_PROGRESS, STATUS.ON_HOLD ]) }
					onClick={ handleSubmit } >
					Save
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.NEW ]) }
					value={ JSON.stringify({ status: STATUS.QUEUED }) }
					onClick={ handleSubmit } >
					Submit
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.QUEUED, STATUS.IN_PROGRESS, STATUS.ON_HOLD ]) }
					warning={ { message: 'Do you want to escalate this ticket ?' } }
					name='escalateName'
					value={ JSON.stringify({ escalation: escalation + 1 }) }
					onConfirm={ handleSubmit } >
					Escalate
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.QUEUED, STATUS.ON_HOLD ]) }
					value={ JSON.stringify({ status: STATUS.IN_PROGRESS }) }
					onClick={ handleSubmit } >
					Set in progress
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.IN_PROGRESS ]) }
					value={ JSON.stringify({ status: STATUS.ON_HOLD }) }
					onClick={ handleSubmit } >
					Place on hold
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.IN_PROGRESS ]) }
					value={ JSON.stringify({ status: STATUS.RESOLVED }) }
					onClick={ handleSubmit } >
					Resolve
				</Button>

				<Button
					styleAs={ ButtonControlBar$ }
					isVisible={ status.isOneOf([ STATUS.RESOLVED ]) }
					value={ JSON.stringify({ status: STATUS.IN_PROGRESS }) }
					onClick={ handleSubmit } >
					Reopen
				</Button>
			</div>
		</ControlBar$>
	);
}

export default ControlBar;
