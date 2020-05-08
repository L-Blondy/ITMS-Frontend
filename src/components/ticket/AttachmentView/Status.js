import styled from 'styled-components';
import React from 'react';
import * as SRC from '../../../assets/icons';

function Alert({ requestStatus, setRequestStatus }) {
	console.log(requestStatus);
	if (!requestStatus)
		return null;

	if (requestStatus.state === 'Loading')
		return (
			<Img$ src={ SRC.preloader } alt='Loading...' />
		);

	else
		return (
			<Div$>
				<h3 className={ 'state ' + requestStatus.state }>
					{ requestStatus.state + ' !' }
				</h3>

				<div className='message'>

					{ (requestStatus.files.map(fileName => (
						<div className='fileName' key={ fileName }>{ fileName }</div>
					))) }

					<div>{ requestStatus.message }</div>
				</div>

				<button className='btn-contained-alert-prim' onClick={ () => setRequestStatus('') }>
					OK
				</button>
			</Div$>
		);
}

export default Alert;

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
	/* background: steelblue; */
`;