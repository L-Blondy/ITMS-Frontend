import React, { createContext, useState, useEffect } from 'react';
import { TicketPage } from '.';
import { Validate } from '../../../utils';

export const TicketCtx = createContext();
export const STATUS = {
	NEW: 'new',
	QUEUED: 'queued',
	IN_PROGRESS: 'in progress',
	ON_HOLD: 'on hold',
	RESOLVED: 'resolved',
	CLOSED: 'closed'
};

function TicketPageWithContext ( { initialData: { worknotesHistory: initialWorknotesHistory, ...initialState } } ) {
	const [ needToSave, setNeedToSave ] = useState( false );
	const [ worknotesHistory, setWorknotesHistory ] = useState( initialWorknotesHistory );
	const [ state, setState ] = useState( initialState );
	const [ isOpened, setIsOpened ] = useState( false );
	const [ dataToPost, setDataToPost ] = useState();
	const [ key, setKey ] = useState( Math.random() );
	const [ changedProps, setChangedProps ] = useState( new Set() );

	useEffect( () => setKey( Math.random() ), [] );

	const ticketCtx = new TicketCtxModel(
		needToSave, setNeedToSave,
		worknotesHistory, setWorknotesHistory,
		state, setState,
		isOpened, setIsOpened,
		dataToPost, setDataToPost,
		changedProps, setChangedProps,
		initialState
	);

	return (
		<TicketCtx.Provider value={ ticketCtx }>
			<TicketPage key={ key } />
		</TicketCtx.Provider>
	);
}

export default TicketPageWithContext;

class TicketCtxModel {

	constructor (
		needToSave, setNeedToSave,
		worknotesHistory, setWorknotesHistory,
		state, setState,
		isOpened, setIsOpened,
		dataToPost, setDataToPost,
		changedProps, setChangedProps,
		initialState
	) {

		this.needToSave = needToSave;
		this.setNeedToSave = setNeedToSave;
		this.worknotesHistory = worknotesHistory;
		this.setWorknotesHistory = setWorknotesHistory;
		this.state = state;
		this.setState = setState;
		this.dataToPost = dataToPost;
		this.setDataToPost = setDataToPost;
		this.initialState = initialState;
		this.changedProps = changedProps;
		this.setChangedProps = setChangedProps;

		this.attachments = {
			isOpened,
			setIsOpened
		};
	}

	handleChange ( e ) {
		const { name, value } = e.target;
		this.setNeedToSave( true );

		const changes = {
			[ name ]: value
		};
		if ( name === 'category' )
			changes.subCategory = '';
		else if ( name === 'impact' )
			changes.priority = 'P' + Math.floor( ( parseInt( this.state.urgency ) + parseInt( value ) ) / 2 );
		else if ( name === 'urgency' )
			changes.priority = 'P' + Math.floor( ( parseInt( value ) + parseInt( this.state.impact ) ) / 2 );

		Validate.setClassName( e.target, name, value );

		this.setState( {
			...this.state,
			...changes
		} );
	}
}
