import React, { createContext, useState, useEffect } from 'react';
import http from '../../../utils/http';
import { BASE_URL } from '../../../../BASE_URL';

export const TicketCtx = createContext();

function TicketContext({ children }) {


	return (
		<TicketCtx.Provider value={ '' }>
			{ children }
		</TicketCtx.Provider>
	);
}

export default TicketContext;