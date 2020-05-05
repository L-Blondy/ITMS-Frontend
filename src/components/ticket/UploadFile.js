import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { baseURL } from '../../../baseURL';
import { UserCtx } from '../../Context';
import http from '../../utils/http';
import SRC_attach from '../../assets/icons/attach.svg';

function UploadFile() {

	const location = useLocation();
	const input = useRef();
	const user = useContext(UserCtx);
	const [ isOpen, setIsOpen ] = useState(false);

	const uploadFile = (e) => {
		e.preventDefault();
		const file = input.current.files[ 0 ];
		if (!file)
			return;
		const formData = new FormData();
		formData.append("file", file);
		formData.append("user", user);

		http()
			.post(baseURL + location.pathname + '/attach', formData)
			.send()
			.catch(e => console.error(e));
	};

	return (<>
		<OpenUploadScreen$ onClick={ () => setIsOpen(!isOpen) } />
		{ isOpen && (
			<UploadScreen$
				method='POST'
				onSubmit={ uploadFile }
				encType='multipart/form-data'>

				<div className='upload-box'>
					<label htmlFor="file">Label of the upload screen</label>
					<input id='file' name='file' ref={ input } type='file' />
					<button>Add</button>
				</div>

			</UploadScreen$>
		) }
	</>);
}

export default UploadFile;

const OpenUploadScreen$ = styled.button`
	width: 2.2rem;
	background-image: ${`url(${ SRC_attach })` };
	background-repeat: no-repeat;
	background-position: center;
	background-size: 25px;
`;
const UploadScreen$ = styled.form`
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

	.upload-box {
		background: white;
	}

	input {
		width:1px;
		height: 1px;
		opacity: 0;
	}
	label {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-right: 0.5rem;
		padding-left: 0.5rem;
		height: 100%;
		
		&:hover {
			cursor: pointer;
		}
	}
	img {
		height: 25px;
	}
`;