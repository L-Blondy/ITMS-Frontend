import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { CLR } from '../../GlobalStyles';
import { Button, ButtonPrimary$, ButtonUpload$ } from '../buttons';

function Upload({ onUpload, fileList }) {

	const [ file, setFile ] = useState();
	const [ error, setError ] = useState('');



	function handleChange(e) {
		setFile(e.target.files[ 0 ]);

		setError('');
	}

	useEffect(() => {
		if (file && fileList.map(file => file.name).includes(file.name))
			setError('This file already exist.');
	}, [ file ]);

	return (
		<Upload$ className='upload-form'>

			<label htmlFor="file">
				<Button
					styleAs={ ButtonPrimary$ }
					tag='span'
					className='choose-btn'>
					Choose file
				</Button>

				{ file && file.name || 'No file chosen' }

				<input
					id='file'
					name='file'
					type='file'
					onChange={ handleChange }
				/>
			</label>

			<Button
				onClick={ () => onUpload(file) }
				styleAs={ ButtonUpload$ }
				className={ file && !error ? 'enabled' : 'disabled' }
			/>

			<div className='error-message'>
				{ error }
			</div>
		</Upload$>
	);
}

export default Upload;

const Upload$ = styled.div`
	display: flex;
	border: 1px solid #CCC;
	margin: 1rem;
	position: relative;

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

	.error-message {
		position: absolute;
		color: red;
		top: 100%;
		font-size: 0.8em;
	}
`;
