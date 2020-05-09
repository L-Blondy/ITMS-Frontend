import styled from 'styled-components';
import React, { useContext } from 'react';
import * as SRC from '../../../assets/icons';
import { CLR } from '../../../GlobalStyles';
import { UserCtx } from '../../../GlobalContext';
import { AttachmentCtx, XHR } from './AttachmentContext';
import { TicketCtx } from '../TicketContext';

function UploadForm({ method, encType }) {

	const user = useContext(UserCtx);
	const Ticket = useContext(TicketCtx);
	const Attachment = useContext(AttachmentCtx);

	const uploadFile = (e) => {
		e.preventDefault();
		if (!Attachment.files.chosen)
			return;

		const formData = new FormData();
		formData.append("file", Attachment.files.chosen);
		formData.append("user", user);
		Attachment.request.setStatus({ state: XHR.LOADING });

		setTimeout(() => {
			Attachment.files.upload(formData);
		}, 500);
	};

	return (
		<Form$ className='upload-form'
			method={ method }
			onSubmit={ uploadFile }
			encType={ encType }>

			<label htmlFor="file">
				<span className='btn-contained-prim choose-btn'>
					Choose file
				</span>

				{ Attachment.files.chosen && Attachment.files.chosen.name || 'No file chosen' }
			</label>

			<input
				id='file'
				name='file'
				type='file'
				onChange={ e => Attachment.files.setChosen(e.target.files[ 0 ]) } />

			<button className={ `btn-contained-prim upload-btn ${ setEnabledOrDisabled(Attachment, Ticket) }` } />
		</Form$>
	);
}

export default UploadForm;

function setEnabledOrDisabled(Attachment, Ticket) {
	if (Attachment.files.chosen && !Ticket.state.fileList.includes(Attachment.files.chosen.name))
		return 'enabled';
	return 'disabled';
}

const Form$ = styled.form`
	display: flex;
	border: 1px solid #CCC;
	margin: 1rem;

	input {
		width:1px;
		height: 1px;
		opacity: 0;
	}

	.choose-btn {
		margin-right: 0.7rem;
		box-sizing: content-box;
		outline: 1px solid ${ CLR.PRIMARY };
	}

	label {
		flex-grow: 1;
		padding-right: 0.7rem;
		border-right: none;
		cursor: pointer;
	}

	.upload-btn {
		background-image: ${ `url(${ SRC.upload })` };
		background-repeat: no-repeat;
		background-position: center;
		background-size: 1.3rem;
		width: 40px;
		color: transparent;

		
		@supports(filter: grayscale(1) brightness(1.4)){
			&.disabled {
				opacity: 1;
				filter: grayscale(1) brightness(1.45);
			}
		}

		&.enabled {
			background-color: #00c4ff;
			border-color: #00c4ff;
			outline: 1px solid #00c4ff;
		}
	}
`;
