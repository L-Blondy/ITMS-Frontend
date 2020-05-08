import styled from 'styled-components';
import React, { useContext, useState, useEffect } from 'react';
import http from '../../../utils/http';
import { BASE_URL } from '../../../../BASE_URL';
import { UserCtx } from '../../../GlobalContext';
import * as SRC from '../../../assets/icons';
import { CLR } from '../../../GlobalStyles';
import { XHR } from './Status';

function UploadForm({ method, encType, state, setRequestStatus }) {

	const [ file, setFile ] = useState('');
	const user = useContext(UserCtx);

	const uploadFile = (e) => {
		e.preventDefault();
		if (!file)
			return;
		const formData = new FormData();
		formData.append("file", file);
		formData.append("user", user);
		setRequestStatus({ state: XHR.LOADING });

		setTimeout(() => {
			http()
				.post(BASE_URL + location.pathname + '/attach', formData)
				.then(res => {
					setRequestStatus({
						state: XHR.SUCCESS,
						files: [ file.name ],
						message: '  was uploaded with success'
					});
					setFile('');
				})
				.catch(e => {
					setRequestStatus({
						state: XHR.ERROR,
						files: [ file.name ],
						message: `  could not be uploaded.\n${ e.message }`
					});
					console.error(e);
				});
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

				{ file && file.name || 'No file chosen' }
			</label>

			<input id='file' name='file' type='file' onChange={ e => setFile(e.target.files[ 0 ]) } />

			<button className={ `btn-contained-prim upload-btn ${ setEnabledOrDisabled(file, state.fileList) }` } />
		</Form$>
	);
}

export default UploadForm;

function setEnabledOrDisabled(file, fileList) {
	if (file && !fileList.includes(file.name)) return 'enabled';
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
			/* box-shadow: 0 0 0 1px #00c4ff; */
		}
	}
`;
