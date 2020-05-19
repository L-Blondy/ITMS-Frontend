import styled from 'styled-components';
import React, { useEffect, useContext } from 'react';
import { BASE_URL } from '/BASE_URL';
import { CLR } from '../../../../GlobalStyles';
import { AttachmentCtx, XHR } from './AttachmentWithContext';
import { formatFileSize, getAttachmentIconSRC } from '../../../../utils';
import { Button } from '../../../';

function Delete({ method }) {

	const attachmentCtx = useContext(AttachmentCtx);

	const handleSelectFile = (e) => {
		if (e.target.checked) {
			attachmentCtx.files.select(e.target.value);
		}
		else {
			attachmentCtx.files.deselect(e.target.value);
		}
	};

	const handleConfirmDelete = () => {
		attachmentCtx.request.setStatus({ state: XHR.LOADING });
		attachmentCtx.files.delete();
	};

	return (
		<Form$ method={ method } onSubmit={ e => e.preventDefault() }>

			<ul className='file-list'>

				{ !attachmentCtx.files.list.length ? (
					<li>No attachments</li>
				) : '' }

				{ attachmentCtx.files.list.length ? (
					attachmentCtx.files.list.map((fileData, i) => (
						<li key={ fileData.name + i }>
							<input
								type='checkbox'
								name='file'
								id={ fileData.name + i }
								value={ fileData.name }
								onChange={ handleSelectFile }
							/>
							<label htmlFor={ fileData.name + i }>
								<img className='icon' src={ getAttachmentIconSRC(fileData) } alt='' />
								<span className='name'>{ fileData.name }</span>
								<span className='light-font'>{ formatFileSize(fileData.size) }</span>
							</label>

							<a href={ BASE_URL + location.pathname + '/' + fileData.name }
								target='_blank'
								rel='noopener noreferrer'>
								view
							</a>
						</li>

					))) : '' }
			</ul>

			<Button
				className={ `btn-contained-alert-sec delete-btn ${ setDisabledOrNothing(attachmentCtx) }` }
				warning={ { disableBg: true } }
				onConfirm={ handleConfirmDelete }>
				Remove
			</Button>

		</Form$ >
	);
}

export default Delete;

function setDisabledOrNothing(attachmentCtx) {
	return !attachmentCtx.files.selected.length ? 'disabled' : '';
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
			display: flex;
			align-items: center;
		}

		img {
			height: 1.1rem;
			margin-right: 0.4rem;
			margin-left: 0.2rem;
			margin-top: -1px;
		}

		.light-font {
			padding: 0 0.5rem 0 0.7rem;
			font-size: 0.9em;
			user-select: none;
			margin-left: auto;
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
	.delete-btn {
		background-color: #ff5043 !important;
		border-color: #ff5043 !important;
		box-shadow: none;
		margin: 1rem;

		&.disabled {
			filter: grayscale(1)
		}
	}
`;
