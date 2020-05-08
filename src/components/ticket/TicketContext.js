import React, { createContext, useState, useEffect } from 'react';
import { useInputValidation } from '../../hooks';
// import http from '../../../utils/http';
// import { BASE_URL } from '../../../../BASE_URL';

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

	const Ticket = new TicketModel(
		needToSave, setNeedToSave,
		worknotesHistory, setWorknotesHistory,
		state, handleChange, setState,
		isDisabled, setIsDisabled,
		isOpened, setIsOpened,
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
	) {
		this.needToSave = needToSave;
		this.setNeedToSave = setNeedToSave;

		this.data = {
			worknotesHistory, setWorknotesHistory,
			state, handleChange, setState,
		};

		this.form = {
			isDisabled, setIsDisabled
		};

		this.attachments = {
			isOpened, setIsOpened
		};
	}
}