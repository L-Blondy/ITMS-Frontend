import styled from 'styled-components';
import React, { useContext } from 'react';
import { TicketCtx } from './TicketPageWithContext';

function DeleteTicket({ when = true, className }) {
	if (!when)
		return null;

	const ticketCtx = useContext(TicketCtx);

	return (
		<Button$ className={ className } onClick={ ticketCtx.deleteTicket }>
			Delete ticket
		</Button$>
	);
}

export default DeleteTicket;

const Button$ = styled.button`
	margin-right: auto;
	box-shadow: none;
	background: #904b9d;
	box-shadow: 0 0 0 1px #904b9d;
	color: white;
	padding: 0 0.8rem;
	border-radius: 2px;
	/* border-radius: 3px; */
	font-weight: bold;
`;
