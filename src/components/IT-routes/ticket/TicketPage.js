import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useInputValidation, useSubscription } from '../../../hooks';
import { IncidentFields, IncidentControlBar, WorknotesHistory } from '.';
import { AttachmentBox } from './attachment';
import { DisableBg$ } from '../../styled';
import { CustomPrompt } from '..';
import { BASE_URL } from '../../../../BASE_URL';
import AttachmentContext from './attachment/AttachmentContext';
import { TicketCtx } from './TicketPageWithContext';

function TicketPage({ serverData }) {

	const Ticket = useContext(TicketCtx);

	const liveData = useSubscription(BASE_URL + location.pathname + '/subscribe');

	useEffect(() => {
		if (liveData) {
			let { worknotesHistory, ...newState } = liveData;
			Ticket.setWorknotesHistory(worknotesHistory);
			Ticket.setState({ ...Ticket.state, ...newState });

			compare(liveData, serverData);
		}
	}, [ liveData ]);

	return (
		<Ticket$ className={ Ticket.form.isDisabled ? 'disabled' : '' }>
			<CustomPrompt
				when={ Ticket.needToSave }
				message={ 'Modifications may not be saved.' }
				reason={ 'Do you want to exit this page ?' }
			/>

			<AttachmentContext isOpened={ Ticket.attachments.isOpened }>
				<DisableBg$>
					<AttachmentBox />
				</DisableBg$>
			</AttachmentContext>

			<IncidentControlBar />

			{ Ticket.state.id.slice(0, 3) === 'INC' ? (
				<IncidentFields />
			) : Ticket.state.id.slice(0, 3) === 'REQ' ? (
				<IncidentFields />
			) : Ticket.state.id.slice(0, 3) === 'CHG' ? (
				<IncidentFields />
			) : '' }

			<WorknotesHistory />

		</Ticket$>
	);
}

export default TicketPage;

function compare(liveData, serverData) {
	for (let prop in serverData) {
		const servVal = serverData[ prop ];
		const liveVal = liveData[ prop ];

		if (prop[ 0 ] === '_')
			continue;

		if (liveVal && prop === 'worknotesHistory') {
			if (servVal.length !== liveVal.length) {
				console.log('%c' + (liveVal.length - servVal.length) + ' worknotes were added', 'background: #222; color: #bada55');
			}
		}
		else if (liveVal && servVal !== liveVal) {
			console.log('%c' + prop + ': changed from ' + servVal + ' to ' + liveVal, 'background: #222; color: #bada55');
		}
	}
}

const Ticket$ = styled.div`
	height: 100%;
	width: 100%;
`;





