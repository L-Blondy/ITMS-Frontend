import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import * as SRC from '/assets/icons';
import { DisableBg } from '../popup';
import { CLR } from '../../GlobalStyles';
import { Button, ButtonClose$, ButtonDanger$ } from '../buttons';
import { UserCtx } from '../../GlobalContext';
import { http } from '../../utils';
import { BASE_URL } from '/BASE_URL';
import { XHR, RequestStatus, Upload, FileList } from '.';

function AttachmentPopup({ when, close, fileList }) {
	if (!when) return null;

	const userCtx = useContext(UserCtx);
	const [ requestStatus, setRequestStatus ] = useState({ state: XHR.UNSENT });
	const [ key, setKey ] = useState(Math.random());


	const fileListForm = useRef();

	function upload(file) {
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);
		formData.append("user", userCtx.name);
		setRequestStatus({ state: XHR.LOADING });

		http()
			.post(BASE_URL + location.pathname + '/attach', formData)
			.then(() => {
				setRequestStatus({
					state: XHR.SUCCESS,
					files: [ file.name ],
					message: '  was uploaded with success'
				});
				setKey(Math.random());
			})
			.catch(e => {
				setRequestStatus({
					state: XHR.ERROR,
					files: [ file.name ],
					message: `  could not be uploaded.\n${ e.message }`
				});
				console.error(e);
			});
	}

	function deleteFiles() {
		const elements = [].slice.call(fileListForm.current.elements);
		const toDelete = elements.reduce((toDelete, el) => {
			el.checked && toDelete.push(el.name);
			return toDelete;
		}, []);
		console.log(toDelete);

		// this.request.setStatus({ state: XHR.LOADING });

		// http()
		// 	.delete(BASE_URL + location.pathname + '/delete', { toDelete: this.files.selected })
		// 	.then(() => {
		// 		this.request.setStatus({
		// 			state: XHR.SUCCESS,
		// 			files: this.files.selected,
		// 			message: ` ${ this.files.selected.length > 1 ? 'were' : 'was' } removed with success.`
		// 		});
		// 		this.files.setSelected([]);
		// 	})
		// 	.catch(e => {
		// 		this.request.setStatus({
		// 			state: XHR.ERROR,
		// 			files: this.files.selected,
		// 			message: '  could not be removed, please try again.'
		// 		});
		// 	});
	}

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
					ref={ fileListForm }
					fileList={ fileList }
				/>

				<Button
					styleAs={ ButtonDanger$ }
					className={ 'delete-btn ' + 'disabledOrNothing(attachmentCtx)' }
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