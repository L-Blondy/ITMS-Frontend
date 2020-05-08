import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { BASE_URL } from '../../../../BASE_URL';
import { CLR } from '../../../GlobalStyles';
import { AttachmentCtx } from './AttachmentContext';

function DeleteForm({ method, state }) {

	const Attachment = useContext(AttachmentCtx);

	const handleSubmit = (e) => {
		e.preventDefault();
		Attachment.deletion.setIsWarning(true);
	};

	const handleSelectFile = (e) => {
		if (e.target.checked) {
			Attachment.files.select(e.target.value);
		}
		else {
			Attachment.files.deselect(e.target.value);
		}
	};

	useEffect(() => {
		if (Attachment.deletion.isConfirmed) {
			Attachment.files.delete();
			Attachment.deletion.setIsConfirmed(false);
		}
	}, [ Attachment.deletion.isConfirmed ]);

	return (
		<Form$ method={ method } onSubmit={ handleSubmit }>

			<ul className='file-list'>

				{ !state.fileList.length ? (
					<li>No attachments</li>
				) : '' }

				{ state.fileList.length ? (
					state.fileList.map((fileName, i) => (

						<li key={ fileName + i }>
							<input
								type='checkbox'
								name='file'
								id={ fileName + i }
								value={ fileName }
								onChange={ handleSelectFile }
							/>
							<label htmlFor={ fileName + i }>{ fileName }</label>

							<a href={ BASE_URL + location.pathname + '/' + fileName }
								target='_blank'
								rel='noopener noreferrer'>
								view
							</a>
						</li>

					))) : '' }
			</ul>

			<button className={ `btn-contained-alert-sec delete-btn ${ setDisabledOrNothing(Attachment) }` }>
				Remove
			</button>

		</Form$>
	);
}

export default DeleteForm;

function setDisabledOrNothing(Attachment) {
	Attachment.files.selected.length ? '' : 'disabled';
}

const Form$ = styled.form`
	ul{
		display: flex;
		flex-direction: column-reverse;
		list-style: none;
		margin: 0 1rem;
	}

	li {
		display: flex;
		align-items: center;
		line-height: 1.7rem;
		
		&:hover {
			background: rgba(0,0,0,0.03);
		}

		input {
			height: 1rem;
			width: 1rem;
		}

		label {
			padding-left: 0.5rem;
			flex-grow: 1;
		}

		a {
			margin-left: auto;
			color: ${ CLR.PRIMARY };
			padding: 0 0.2rem;

			&:hover {
				opacity: 1;
				text-decoration: underline;
			}
		}
	}

	button {
		background-color: #ff5043;
		border-color: #ff5043;
		box-shadow: none;
		margin: 1rem;

		&.disabled {
			filter: grayscale(1)
		}
	}
`;
