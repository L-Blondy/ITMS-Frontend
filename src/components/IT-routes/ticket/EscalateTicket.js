import React, { useContext, useState, useEffect } from 'react';
import { TicketCtx } from './TicketPageWithContext';
import { Warning, DisableBg } from '../../';


function EscalateTicket(props) {
	const RenderAs = props.renderAs;
	const ticketCtx = useContext(TicketCtx);
	const [ isWarning, setIsWarning ] = useState(false);
	const [ isConfirmed, setIsConfirmed ] = useState(false);

	const handleChoice = (choice) => {
		setIsWarning(false);
		setIsConfirmed(choice);
	};

	useEffect(() => {
		if (!isConfirmed)
			return;

		props.handleSubmit({ escalation: ticketCtx.state.escalation + 1 });
	}, [ isConfirmed ]);


	return (<>
		<DisableBg when={ isWarning } />
		<Warning
			when={ isWarning }
			message='Are you sure you want to ESCALATE this Ticket ?'
			handleChoice={ handleChoice }
		/>
		<RenderAs { ...props } onClick={ () => setIsWarning(true) } />
	</>);
}

export default EscalateTicket;
