import styled from 'styled-components';
import React, { useContext } from 'react';
import * as SRC from '/assets/icons';
import { CLR } from '../../../../GlobalStyles';
import { UserCtx } from '../../../../GlobalContext';
import { AttachmentCtx, XHR } from './AttachmentWithContext';
import { Button, ButtonPrimary$, ButtonUpload$ } from '../../../buttons';

function UploadForm ( { method, encType } ) {

	const userCtx = useContext( UserCtx );
	const attachmentCtx = useContext( AttachmentCtx );

	const uploadFile = ( e ) => {
		e.preventDefault();
		console.log( e )
		if ( !attachmentCtx.files.chosen )
			return;

		const formData = new FormData();
		formData.append( "file", attachmentCtx.files.chosen );
		formData.append( "user", userCtx.name );
		attachmentCtx.request.setStatus( { state: XHR.LOADING } );
		attachmentCtx.files.upload( formData );
	};

	return (
		<Form$ className='upload-form'
			method={ method }
			onSubmit={ uploadFile }
			encType={ encType }>

			<label htmlFor="file">
				<Button
					styleAs={ ButtonPrimary$ }
					tag='span'
					className='choose-btn'>
					Choose file
				</Button>

				{ attachmentCtx.files.chosen && attachmentCtx.files.chosen.name || 'No file chosen' }

				<input
					id='file'
					name='file'
					type='file'
					onChange={ e => attachmentCtx.files.setChosen( e.target.files[ 0 ] ) }
				/>
			</label>

			<Button
				type='submit'
				styleAs={ ButtonUpload$ }
				className={ enabledOrDisabled( attachmentCtx ) }
			/>
		</Form$>
	);
}

export default UploadForm;

function enabledOrDisabled ( attachmentCtx ) {
	if ( attachmentCtx.files.chosen && !attachmentCtx.files.list.includes( attachmentCtx.files.chosen.name ) )
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
`;
