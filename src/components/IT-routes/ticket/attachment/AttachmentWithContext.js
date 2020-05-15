import React, { createContext, useState } from 'react';
import http from '../../../../utils/http';
import { BASE_URL } from '../../../../../BASE_URL';
import { AttachmentBox } from '.';

export const AttachmentCtx = createContext();
export const XHR = {
	UNSENT: 'Unsent',
	LOADING: 'Loading',
	SUCCESS: 'Success',
	ERROR: 'Error'
};

function AttachmentWithContext({ fileList, isOpened }) {

	const [ status, setStatus ] = useState({ state: XHR.UNSENT });
	const [ isWarning, setIsWarning ] = useState(false);
	const [ isConfirmed, setIsConfirmed ] = useState(false);
	const [ selected, setSelected ] = useState([]);
	const [ chosen, setChosen ] = useState();

	const Attachment = new AttachmentModel(
		status, setStatus,
		isWarning, setIsWarning,
		isConfirmed, setIsConfirmed,
		selected, setSelected,
		chosen, setChosen,
		fileList,
	);

	return (
		<AttachmentCtx.Provider value={ Attachment }>
			{ isOpened && <AttachmentBox /> }
		</AttachmentCtx.Provider>
	);
}

export default AttachmentWithContext;

class AttachmentModel {

	constructor(
		status, setStatus,
		isWarning, setIsWarning,
		isConfirmed, setIsConfirmed,
		selected, setSelected,
		chosen, setChosen,
		fileList
	) {

		this.request = {
			status,
			setStatus,
		};

		this.deletion = {
			isWarning,
			setIsWarning,
			isConfirmed,
			setIsConfirmed,
		};

		this.files = {
			selected,
			setSelected,
			chosen,
			setChosen,
			list: fileList,

			select: (selectedFileName) => {
				this.files.setSelected([
					...this.files.selected,
					selectedFileName
				]);
			},

			deselect: (selectedFileName) => {
				this.files.setSelected(
					this.files.selected.filter(fileName => fileName !== selectedFileName)
				);
			},

			delete: () => {
				this.request.setStatus({ state: XHR.LOADING });

				http()
					.delete(BASE_URL + location.pathname + '/delete', { toDelete: this.files.selected })
					.then(() => {
						this.request.setStatus({
							state: XHR.SUCCESS,
							files: this.files.selected,
							message: ` ${ this.files.selected.length > 1 ? 'were' : 'was' } removed with success.`
						});
						this.files.setSelected([]);
					})
					.catch(e => {
						this.request.setStatus({
							state: XHR.ERROR,
							files: this.files.selected,
							message: '  could not be removed, please try again.'
						});
					});
			},

			upload: (formData) => {
				http()
					.post(BASE_URL + location.pathname + '/attach', formData)
					.then(() => {
						this.request.setStatus({
							state: XHR.SUCCESS,
							files: [ this.files.chosen.name ],
							message: '  was uploaded with success'
						});
						this.files.setChosen('');
					})
					.catch(e => {
						this.request.setStatus({
							state: XHR.ERROR,
							files: [ this.files.chosen.name ],
							message: `  could not be uploaded.\n${ e.message }`
						});
						console.error(e);
					});
			}
		};
	}
}

