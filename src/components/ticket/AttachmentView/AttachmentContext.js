import React, { createContext, useState, useEffect } from 'react';
import http from '../../../utils/http';
import { BASE_URL } from '../../../../BASE_URL';

export const AttachmentCtx = createContext();
export const XHR = {
	UNSENT: 'Unsent',
	LOADING: 'Loading',
	SUCCESS: 'Success',
	ERROR: 'Error'
};

function AttachmentContext({ children }) {

	const [ status, setStatus ] = useState({ state: XHR.UNSENT });
	const [ isWarning, setIsWarning ] = useState(false);
	const [ isConfirmed, setIsConfirmed ] = useState(false);
	const [ selected, setSelected ] = useState([]);
	const [ chosen, setChosen ] = useState();

	useEffect(() => console.log(isConfirmed), [ isConfirmed ]);

	const Attachment = new AttachmentModel(
		status, setStatus,
		isWarning, setIsWarning,
		isConfirmed, setIsConfirmed,
		selected, setSelected,
		chosen, setChosen
	);

	return (
		<AttachmentCtx.Provider value={ Attachment }>
			{ children }
		</AttachmentCtx.Provider>
	);
}

export default AttachmentContext;


class AttachmentModel {

	constructor(
		status, setStatus,
		isWarning, setIsWarning,
		isConfirmed, setIsConfirmed,
		selected, setSelected,
		chosen, setChosen
	) {

		this.request = {
			status, setStatus,
		};

		this.deletion = {
			isWarning, setIsWarning,
			isConfirmed, setIsConfirmed,
		};

		this.files = {
			selected, setSelected,
			chosen, setChosen,

			select: (selectedFileName) => {
				this.files.setSelected([
					...this.files.selected,
					selectedFileName
				]);
			},

			deselect: (deselectedFileName) => {
				this.files.setSelected(
					this.files.selected.filter(fileName => fileName !== deselectedFileName)
				);
			},

			delete: () => {
				this.request.setStatus({ state: XHR.LOADING });

				http()
					.delete(BASE_URL + location.pathname + '/delete', { toDelete: this.files.selected })
					.then(res => {
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
			}
		};
	}
}