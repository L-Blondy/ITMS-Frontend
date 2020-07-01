import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { DisableBg } from '../popup';
import { CLR } from '../../GlobalStyles';
import { Button, ButtonClose$, ButtonDanger$ } from '../buttons';
import { UserCtx } from '../../GlobalContext';
import { XHR, RequestStatus, Upload, FileList } from '.';
import { useUpload, useDelete } from './helpers';

function AttachmentPopup({ when, close, fileList }) {
	if (!when) return null;

	const userCtx = useContext(UserCtx);
	const [ requestStatus, setRequestStatus ] = useState({ state: XHR.UNSENT });
	const [ key, setKey ] = useState(Math.random());
	const [ selectedFiles, setSelectedFiles ] = useState([]);

	const upload = useUpload(userCtx.name, setKey, setRequestStatus);
	const deleteFiles = useDelete(selectedFiles, setSelectedFiles, setKey, setRequestStatus);

	const selectFile = (file) => {
		if (!selectedFiles.includes(file.name))
			return setSelectedFiles([ ...selectedFiles, file.name ]);
		setSelectedFiles(selectedFiles.filter(name => name !== file.name));
	};

	return (
		<>
			<DisableBg />

			<AttachmentPopup$ requestStatus$={ requestStatus }>

				<div className='header'>
					<span>Attachments</span>
					<Button
						styleAs={ ButtonClose$ }
						onClick={ close }
					/>
				</div>

				<Upload
					onUpload={ upload }
					fileList={ fileList }
					key={ 'file' + key }
				/>

				<FileList
					fileList={ fileList }
					selectFile={ selectFile }
				/>

				<Button
					styleAs={ DeleteButton$ }
					className={ 'delete-btn ' + (selectedFiles.length ? '' : 'disabled') }
					warning={ { disableBg: true } }
					onConfirm={ deleteFiles }>
					Remove
				</Button>

			</AttachmentPopup$>

			<RequestStatus
				requestStatus={ requestStatus }
				setRequestStatus={ setRequestStatus }
			/>
		</>
	);
}

export default AttachmentPopup;

const AttachmentPopup$ = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	min-width: 450px;
	max-height: 100vh;
	z-index: ${({ requestStatus$ }) => requestStatus$.state === XHR.UNSENT ? 1003 : 1001 };

	.header {
		padding-left: 1rem;
		padding-right: 1rem;
		font-size: 1.2rem;
		line-height: 3em;
		background: ${ CLR.PRIMARY };
		color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;

		&>span {
			color: inherit;
		}
	}
`;

const DeleteButton$ = styled(ButtonDanger$)`
	margin: 1rem;
`;