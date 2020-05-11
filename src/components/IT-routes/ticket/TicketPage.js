import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useInputValidation, useSubscription } from '../../../hooks';
import { Fields, ControlBar, WorknotesHistory } from '.';
import { CustomPrompt } from '..';
import { BASE_URL } from '../../../../BASE_URL';
import AttachmentWithContext from './attachment/AttachmentWithContext';
import { TicketCtx } from './TicketPageWithContext';

function TicketPage({ serverData }) {

	const ticketCtx = useContext(TicketCtx);
	const { ticketType } = useParams();

	const liveData = useSubscription(BASE_URL + location.pathname + '/subscribe');

	useEffect(() => {
		if (liveData) {
			let { worknotesHistory, ...newState } = liveData;
			ticketCtx.setWorknotesHistory(worknotesHistory);
			ticketCtx.setState({ ...ticketCtx.state, ...newState });

			compare(liveData, serverData);
		}
	}, [ liveData ]);

	return (
		<Ticket$ className={ ticketCtx.form.isDisabled ? 'disabled' : '' }>
			<CustomPrompt
				when={ ticketCtx.needToSave }
				message={ 'Modifications may not be saved.' }
				reason={ 'Do you want to exit this page ?' }
			/>

			<AttachmentWithContext isOpened={ ticketCtx.attachments.isOpened } />

			<ControlBar />

			{ ticketType === 'INC' ? (
				<Fields />
			) : ticketType === 'REQ' ? (
				<Fields />
			) : ticketType === 'CHG' ? (
				<Fields />
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





