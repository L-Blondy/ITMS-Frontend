import React, { createContext, useState, useEffect } from 'react';
import { useTicketInputValidation } from '../../../hooks';
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
	const [ state, handleChange, setState ] = useTicketInputValidation(initialState, setNeedToSave);
	const [ isOpened, setIsOpened ] = useState(false);
	const [ dataToPost, setDataToPost ] = useState();
	const [ key, setKey ] = useState(Math.random());

	useEffect(() => setKey(Math.random()), []);

	const ticketCtx = new TicketCtxModel(
		needToSave, setNeedToSave,
		worknotesHistory, setWorknotesHistory,
		state, handleChange, setState,
		isOpened, setIsOpened,
		dataToPost, setDataToPost,
	);

	return (
		<TicketCtx.Provider value={ ticketCtx }>
			<TicketPage key={ key } />
		</TicketCtx.Provider>
	);
}

export default TicketPageWithContext;

class TicketCtxModel {

	constructor(
		needToSave, setNeedToSave,
		worknotesHistory, setWorknotesHistory,
		state, handleChange, setState,
		isOpened, setIsOpened,
		dataToPost, setDataToPost,
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

		this.attachments = {
			isOpened,
			setIsOpened
		};
	}
}
