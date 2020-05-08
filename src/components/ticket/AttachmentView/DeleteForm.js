import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import http from '../../../utils/http';
import { BASE_URL } from '../../../../BASE_URL';
import { CLR } from '../../../GlobalStyles';

function DeleteForm({ method, state, setRequestStatus, togglePromptDelete, isDeletionConfirmed }) {

	const [ selectedFiles, setSelectedFiles ] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		togglePromptDelete(true);
	};

	const deleteFiles = (e) => {
		console.log('delete files');
		setRequestStatus({ state: 'Loading' });

		http()
			.delete(BASE_URL + location.pathname + '/delete', { toDelete: selectedFiles })
			.then(res => {
				setRequestStatus({
					state: 'Success',
					files: selectedFiles,
					message: selectedFiles.length > 1 ? '  were removed with success.' : '  was removed with success.'
				});
				setSelectedFiles([]);
			})
			.catch(e => {
				setRequestStatus({
					state: 'Error',
					files: selectedFiles,
					message: '  could not be removed, please try again.'
				});
			});
	};

	const handleSelectFile = (e) => {
		if (e.target.checked) {
			setSelectedFiles([ ...selectedFiles, e.target.value ]);
		}
		else {
			setSelectedFiles(selectedFiles.filter(fileName => fileName !== e.target.value));
		}
	};

	useEffect(() => { isDeletionConfirmed && deleteFiles(); }, [ isDeletionConfirmed ]);

	return (
		<Form$ method={ method } onSubmit={ handleSubmit }>

			<ul className='file-list'>
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
					))) : (
						<li>No attachments</li>
					) }
			</ul>

			<button className={ `btn-contained-alert-sec delete-btn ${ !selectedFiles.length ? 'disabled' : '' }` }>
				Remove
			</button>

		</Form$>
	);
}

export default DeleteForm;

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
