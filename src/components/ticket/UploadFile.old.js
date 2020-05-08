import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { BASE_URL } from '../../../BASE_URL';
import { UserCtx } from '../../Context';
import http from '../../utils/http';
import SRC_paperclip from '../../assets/icons/paperclip.svg';
import SRC_upload from '../../assets/icons/upload.svg';
import SRC_close from '../../assets/icons/close.svg';

function UploadFile({ state }) {

	const location = useLocation();
	const user = useContext(UserCtx);
	const [ isOpen, setIsOpen ] = useState(false);
	const [ file, setFile ] = useState('');
	const [ selectedFiles, setSelectedFiles ] = useState([]);
	const [ endMessage, setEndMessage ] = useState('');

	const uploadFile = (e) => {
		e.preventDefault();
		if (!file)
			return;
		const formData = new FormData();
		formData.append("file", file);
		formData.append("user", user);
		setEndMessage({
			state: 'Loading',
			fileName: file.name,
		});

		setTimeout(() => {
			http()
				.post(BASE_URL + location.pathname + '/attach', formData)
				.then(res => {
					setEndMessage({
						state: 'Success',
						fileName: file.name,
						message: '  was uploaded with success'
					});
					setFile('');
				})
				.catch(e => {
					setEndMessage({
						state: 'Error',
						fileName: file.name,
						message: `  could not be uploaded.\n${ e.message }`
					});
					console.error(e);
				});
		}, 1000);
	};

	const deleteFiles = (e) => {
		e.preventDefault();

		http()
			.delete(BASE_URL + location.pathname + '/delete', { toDelete: selectedFiles })
			.then(res => console.log(res))
			.catch(e => console.log(e));
	};

	const handleSelectFile = (e) => {
		if (e.target.checked) {
			setSelectedFiles([ ...selectedFiles, e.target.value ]);
		}
		else {
			setSelectedFiles(selectedFiles.filter(fileName => fileName !== e.target.value));
		}
	};

	const open = () => setIsOpen(true);

	const close = (e) => {
		e.preventDefault();
		setIsOpen(false);
		setFile('');
	};

	useEffect(() => {
		if (endMessage.state === 'Success') {
			setFile('');
		}
	}, [ endMessage ]);

	return (<>
		<PaperclipBtn$ onClick={ open } />

		{ isOpen && (
			<DisableBg$>

				<UploadBox$ endMessage={ endMessage }>

					<div className='header'>
						<span>Attachments</span>

						<button className='close-btn' onClick={ close }></button>
					</div>

					<form className='upload-form'
						method='POST'
						onSubmit={ uploadFile }
						encType='multipart/form-data'>

						<label htmlFor="file">
							<span className='btn-contained-prim choose-btn'>
								Choose file
							</span>

							{ file && file.name || 'No file chosen' }
						</label>

						<input id='file' name='file' type='file' onChange={ e => setFile(e.target.files[ 0 ]) } />

						<button className={ `btn-contained-prim upload-btn ${ file && !state.fileList.includes(file.name) ? 'enabled' : 'disabled' }` } />
					</form>

					<form className='delete-form'
						method='DELETE'
						onSubmit={ deleteFiles }>

						<ul className='file-list'>
							{ state.fileList.length ? (
								state.fileList.map((fileName, i) => (
									<li key={ fileName + i }>
										<input type='checkbox' name='file' id={ fileName + i } value={ fileName } onChange={ handleSelectFile } />
										<label htmlFor={ fileName + i }>{ fileName }</label>
									</li>
								))) : (
									<li>No attachments</li>
								) }
						</ul>

						<button className={ `btn-contained-alert-sec delete-btn ${ !selectedFiles.length ? 'disabled' : '' }` }>
							Delete
						</button>
					</form>

				</UploadBox$>

			</DisableBg$>
		) }

		{ endMessage && <AlertSuccess$>
			<div className='state'>
				{ endMessage.state }
			</div>
			<div className='message'>
				<b><i>{ endMessage.fileName }</i></b>{ endMessage.message }
			</div>
			<button className='btn-contained-alert-prim' onClick={ () => setEndMessage('') }>
				OK
			</button>
		</AlertSuccess$> }

	</>);
}

export default UploadFile;

const PaperclipBtn$ = styled.button`
	width: 2.2rem;
	background-image: ${ `url(${ SRC_paperclip })` };
	background-repeat: no-repeat;
	background-position: center;
	background-size: 25px;
`;
const DisableBg$ = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1002;
	background: rgba(0,0,0,0.4);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const UploadBox$ = styled.div`
	background: white;
	min-width: 450px;
	${ props => props.endMessage && 'filter: brightness(0.8)' };

	.header {
		padding-left: 1rem;
		padding-right: 1rem;

		.close-btn {
			font-size: 2rem;
			background: none;
			box-shadow: none;
			color: white;
			font-weight: bold;
			cursor: pointer;
			width: 20px;
			background-image: ${ `url(${ SRC_close })` };
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
				/* background: red; */
				/* z-index:1003; */
			}

			&:hover {
				opacity: 0.7;
			}
		}
	}

	.upload-form,
	.delete-btn {
		margin: 1rem;
	}
	.file-list {
		margin: 0 1rem;
	}

	.header {
		font-size: 1.2rem;
		line-height: 3em;
		background: #4999a3;
		color: white;
		display: flex;
		justify-content: space-between;
	}

	.upload-form {
		display: flex;
		border: 1px solid #CCC;

		input {
			width:1px;
			height: 1px;
			opacity: 0;
		}

		.choose-btn {
			margin-right: 0.7rem;
		}

		label {
			flex-grow: 1;
			padding-right: 0.7rem;
			border-right: none;
			cursor: pointer;
		}

		.upload-btn {
			background-image: ${ `url(${ SRC_upload })` };
			background-repeat: no-repeat;
			background-position: center;
			background-size: 1.3rem;
			width: 40px;
			color: transparent;

			&.disabled {
				opacity: 1;
				filter: grayscale(1) brightness(1.4);
			}

			&.enabled {
				background-color: #00c4ff;
				box-shadow: 0 0 0 1px #00c4ff;
			}
		}
	}

	.delete-form {

		ul{
			display: flex;
			flex-direction: column-reverse;
			list-style: none;
		}

		li {
			display: flex;
			align-items: center;

			label {
				padding-left: 0.5rem;
			}
		}
	}

`;

const AlertSuccess$ = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	z-index: 1003;

	.state {

	}

	.message {
		white-space: pre;
	}
`;