import React, { createContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useInputValidation } from '../../../hooks';
import http from '../../../utils/http';
import { BASE_URL } from '../../../../BASE_URL';
import { TicketPage } from '.';

export const TicketCtx = createContext();
export const STATUS = {
	NEW: 'new',
	QUEUED: 'queued',
	IN_PROGRESS: 'in progress',
	ON_HOLD: 'on hold',
	RESOLVED: 'resolved',
	CLOSED: 'closed'
};

function TicketPageWithContext({ initialData: { worknotesHistory: initialWorknotesHistory, ...initialState } }) {

	const [ needToSave, setNeedToSave ] = useState(false);
	const [ worknotesHistory, setWorknotesHistory ] = useState(initialWorknotesHistory);
	const [ state, handleChange, setState ] = useInputValidation(initialState, setNeedToSave);
	const [ isDisabled, setIsDisabled ] = useState(false);
	const [ isOpened, setIsOpened ] = useState(false);
	const [ dataToPost, setDataToPost ] = useState();
	const [ isWarning, setIsWarning ] = useState(false);
	const [ isConfirmed, setIsConfirmed ] = useState(false);
	const history = useHistory();
	const params = useParams();

	const ticketCtx = new TicketCtxModel(
		needToSave, setNeedToSave,
		worknotesHistory, setWorknotesHistory,
		state, handleChange, setState,
		isDisabled, setIsDisabled,
		isOpened, setIsOpened,
		dataToPost, setDataToPost,
		isWarning, setIsWarning,
		isConfirmed, setIsConfirmed,
		history, params,
	);

	return (
		<TicketCtx.Provider value={ ticketCtx }>
			<TicketPage />
		</TicketCtx.Provider>
	);
}

export default TicketPageWithContext;

class TicketCtxModel {

	constructor(
		needToSave, setNeedToSave,
		worknotesHistory, setWorknotesHistory,
		state, handleChange, setState,
		isDisabled, setIsDisabled,
		isOpened, setIsOpened,
		dataToPost, setDataToPost,
		isWarning, setIsWarning,
		isConfirmed, setIsConfirmed,
		history, params,
	) {

		this.needToSave = needToSave;
		this.setNeedToSave = setNeedToSave;
		this.worknotesHistory = worknotesHistory;
		this.setWorknotesHistory = setWorknotesHistory;
		this.state = state;
		this.handleChange = handleChange;
		this.setState = setState;
		this.dataToPost = dataToPost;
		this.setDataToPost = setDataToPost;

		this.escalation = {
			isWarning,
			setIsWarning,
			isConfirmed,
			setIsConfirmed
		};
		this.isWarning = isWarning;
		this.setIsWarning = setIsWarning;

		this.page = {
			isDisabled,
			setIsDisabled
		};

		this.attachments = {
			isOpened,
			setIsOpened
		};

		this.post = () => {
			http()
				.post(BASE_URL + location.pathname, this.dataToPost)
				.then(res => history.push(`/it/ticket/${ params.ticketType }/${ res.id }`))
				.catch(error => {
					console.error(error);
					this.form.setIsDisabled(false);
				});
		};
	}
}
