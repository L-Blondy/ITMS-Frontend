import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSubscription } from '../../../hooks';
import { Fields, ControlBar, WorknotesHistory, FileList } from '.';
import { LocationPrompt } from '../';
import { BASE_URL } from '/BASE_URL';
import AttachmentWithContext from './attachment/AttachmentWithContext';
import { TicketCtx } from './TicketPageWithContext';
import { CLR } from '../../../GlobalStyles';

function TicketPage() {

	const ticketCtx = useContext(TicketCtx);

	const { type } = useParams();
	const liveData = useSubscription(BASE_URL + location.pathname + '/subscribe');

	useEffect(() => {
		if (liveData) {
			let { worknotesHistory, ...newState } = liveData;
			worknotesHistory && ticketCtx.setWorknotesHistory(worknotesHistory);
			ticketCtx.setState({ ...ticketCtx.state, ...newState });

			const changedProps = compare(liveData, ticketCtx.initialState);
			console.log(changedProps);
		}
	}, [ liveData ]);

	return (<>
		<ControlBar />

		<Ticket$>

			<FileList
				when={ ticketCtx.state.fileList.length }
				fileList={ ticketCtx.state.fileList }
			/>

			<LocationPrompt
				when={ ticketCtx.needToSave }
				message={ 'Modifications may not be saved.' }
				reason={ 'Do you want to exit this page ?' }
			/>

			<AttachmentWithContext
				fileList={ ticketCtx.state.fileList }
				isOpened={ ticketCtx.attachments.isOpened }
			/>

			{ type === 'incidents' ? (
				<Fields />
			) : type === 'requests' ? (
				<Fields />
			) : type === 'changes' ? (
				<Fields />
			) : '' }

			<WorknotesHistory />

		</Ticket$>
	</>);
}

export default TicketPage;

function compare(liveData, serverData) {
	let changedProps = [];
	for (let prop in serverData) {
		const servVal = serverData[ prop ];
		const liveVal = liveData[ prop ];

		if (prop.isOneOf([ '_id', '__v', 'updatedOn', 'fileList' ]))
			continue;

		if (liveVal && prop === 'worknotesHistory') {
			if (servVal.length !== liveVal.length) {
				console.log('%c' + (liveVal.length - servVal.length) + ' worknotes were added', 'background: #222; color: #bada55');
			}
		}
		else if (liveVal && servVal !== liveVal) {
			console.log('%c' + prop + ': changed from ' + servVal + ' to ' + liveVal, 'background: #222; color: #bada55');
			changedProps.push(prop);
		}
	}
	return changedProps;
}

const Ticket$ = styled.div`
	width: 100%;
	overflow-x: hidden;
	overflow-y: scroll;
	flex-grow: 1;

	input,
	textarea,
	select,
	.worknote {
		border: 1px solid ${CLR.BORDER.PRIMARY };
	}
`;






