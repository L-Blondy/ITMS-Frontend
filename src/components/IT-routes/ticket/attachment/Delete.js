import styled from 'styled-components';
import React, { useEffect, useContext } from 'react';
import { BASE_URL } from '/BASE_URL';
import { CLR } from '../../../../GlobalStyles';
import { AttachmentCtx, XHR } from './AttachmentWithContext';
import { Button, ButtonDanger$ } from '../../../buttons';
import { Input, InputFlexReverse$ } from '../../../inputs';
import { FileData } from '../../../files';

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
				{ attachmentCtx.files.list.map((fileData, i) => (
					<li key={ fileData.name + i }>
						<Input
							styleAs={ InputFlexReverse$ }
							className='file-select'
							type='checkbox'
							name='file'
							value={ fileData.name }
							onChange={ handleSelectFile }
							label={ <FileData data={ fileData } /> }
						/>

						<a href={ BASE_URL + location.pathname + '/' + fileData.name }
							target='_blank'
							rel='noopener noreferrer'>
							view
						</a>
					</li>
				)) }
			</ul>

			<Button
				styleAs={ ButtonDanger$ }
				className={ 'delete-btn ' + disabledOrNothing(attachmentCtx) }
				warning={ { disableBg: true } }
				onConfirm={ handleConfirmDelete }>
				Remove
			</Button>

		</Form$>
	);
}

export default Delete;

function disabledOrNothing(attachmentCtx) {
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

		.file-select,
		.file-data {
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
	.delete-btn {
		margin: 1rem;
	}
`;
