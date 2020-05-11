import styled from 'styled-components';
import React, { useContext } from 'react';
import { preloader } from '../../../../assets/icons';
import { AttachmentCtx, XHR } from './AttachmentWithContext';

function Status() {

	const attachmentCtx = useContext(AttachmentCtx);

	if (attachmentCtx.request.status.state === XHR.UNSENT) {
		return null;
	}

	if (attachmentCtx.request.status.state === XHR.LOADING) {
		return (
			<Img$ src={ preloader } alt='Loading...' />
		);
	}

	else {
		console.log(attachmentCtx.request.status);
		return (
			<Div$>
				<h3 className={ 'state ' + attachmentCtx.request.status.state }>
					{ attachmentCtx.request.status.state + ' !' }
				</h3>

				<div className='message'>

					{ (attachmentCtx.request.status.files.map(fileName => (
						<div className='fileName' key={ fileName }>{ fileName }</div>
					))) }

					<div>{ attachmentCtx.request.status.message }</div>
				</div>

				<button className='btn-contained-alert-prim' onClick={ () => attachmentCtx.request.setStatus({ state: XHR.UNSENT }) }>
					OK
				</button>
			</Div$>
		);
	}
}

export default Status;

const Div$ = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	z-index: 1003;
	text-align: center;

	.state {
		line-height: 50px;
		color: white;

		&.Success {
			background: #1ac000;
		}
		&.Error {
			background:red
		}
	}
	.message {
		white-space: pre;
		margin: 1.7rem;
		line-height: 1.7em;

		.fileName {
			font-weight: bold;
			text-transform: italic;
		}
	}

	button {
		margin-bottom: 1.5rem;
		font-size: 1.1rem;
	}
`;

const Img$ = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100px;
	height: 100px;
`;