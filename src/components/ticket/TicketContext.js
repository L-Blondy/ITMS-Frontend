import React, { createContext, useState, useEffect } from 'react';
import { useInputValidation } from '../../hooks';
import { useHistory } from 'react-router-dom';
import http from '../../utils/http';
import { BASE_URL } from '../../../BASE_URL';

export const TicketCtx = createContext();
export const STATUS = {
	NEW: 'new',
	QUEUED: 'queued',
	IN_PROGRESS: 'in progress',
	ON_HOLD: 'on hold',
	RESOLVED: 'resolved',
	CLOSED: 'closed'
};

function TicketContext({ children, initialData: { worknotesHistory: initialWorknotesHistory, ...initialState } }) {

	const [ needToSave, setNeedToSave ] = useState(false);
	const [ worknotesHistory, setWorknotesHistory ] = useState(initialWorknotesHistory);
	const [ state, handleChange, setState ] = useInputValidation(initialState, setNeedToSave);
	const [ isDisabled, setIsDisabled ] = useState(false);
	const [ isOpened, setIsOpened ] = useState(false);
	const [ dataToPost, setDataToPost ] = useState();
	const history = useHistory();

	const Ticket = new TicketModel(
		needToSave, setNeedToSave,
		worknotesHistory, setWorknotesHistory,
		state, handleChange, setState,
		isDisabled, setIsDisabled,
		isOpened, setIsOpened,
		dataToPost, setDataToPost,
		history,
	);

	return (
		<TicketCtx.Provider value={ Ticket }>
			{ children }
		</TicketCtx.Provider>
	);
}

export default TicketContext;

class TicketModel {

	constructor(
		needToSave, setNeedToSave,
		worknotesHistory, setWorknotesHistory,
		state, handleChange, setState,
		isDisabled, setIsDisabled,
		isOpened, setIsOpened,
		dataToPost, setDataToPost,
		history,
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

		this.form = {
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
				.then(res => history.push('/ticket/' + res.id))
				.catch(error => {
					console.error(error);
					this.form.setIsDisabled(false);
				});
		};
	}
}
