import React, { useState } from 'react';
import styled from 'styled-components';
import * as SRC from '../../../assets/icons';
import { UploadForm, DeleteForm, DeletePrompt, Status } from './';
import { CLR } from '../../../GlobalStyles';

function AttachmentBox({ state, setIsAttachOpened }) {

	const [ requestStatus, setRequestStatus ] = useState('');
	const [ isPrompting, togglePromptDelete ] = useState(false);
	const [ isDeletionConfirmed, setIsDeletionConfirmed ] = useState(false);

	const handlePromptAnswer = (userAnswer) => {
		togglePromptDelete(false);
		setIsDeletionConfirmed(userAnswer);
	};//test

	return (<>
		<UploadBox$ requestStatus={ requestStatus } isPrompting={ isPrompting }>

			<div className='header'>
				<span>Attachments</span>
				<button className='close-btn' onClick={ () => setIsAttachOpened(false) }></button>
			</div>

			<UploadForm
				method='POST'
				encType='multipart/form-data'
				state={ state }
				setRequestStatus={ setRequestStatus }
			/>

			<DeleteForm
				method='DELETE'
				state={ state }
				setRequestStatus={ setRequestStatus }
				togglePromptDelete={ togglePromptDelete }
				isDeletionConfirmed={ isDeletionConfirmed }
				setIsDeletionConfirmed={ setIsDeletionConfirmed }
			/>

		</UploadBox$>

		<Status
			requestStatus={ requestStatus }
			setRequestStatus={ setRequestStatus }
		/>

		<DeletePrompt
			message='Are you sure ?'
			isPrompting={ isPrompting }
			handlePromptAnswer={ handlePromptAnswer }
		/>

	</>);
}

export default AttachmentBox;

const UploadBox$ = styled.div`
	background: white;
	min-width: 450px;
	${ props => {
		if (props.requestStatus || props.isPrompting) {
			return `
				&::before {
					content:'';
					position: absolute;
					z-index: 1;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: rgba(0,0,0,0.25)
				}
				@supports(filter: brightness(0.75)){
					filter: brightness(0.75);
					pointer-events: none;

					&::before {
						background: none;
					}
				}
		`;
		}
	} }
	
	.header {
		padding-left: 1rem;
		padding-right: 1rem;
		font-size: 1.2rem;
		line-height: 3em;
		background: ${ CLR.PRIMARY };
		color: white;
		display: flex;
		justify-content: space-between;

		.close-btn {
			font-size: 2rem;
			background: none;
			box-shadow: none;
			color: white;
			font-weight: bold;
			cursor: pointer;
			width: 20px;
			background-image: ${ `url(${ SRC.close })` };
			background-repeat: no-repeat;
			background-position: center;
			background-size: 20px;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 40px;
				height: 40px;
			}

			&:hover {
				opacity: 0.7;
			}
		}
	}
`;