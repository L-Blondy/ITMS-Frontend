import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useInputValidation, useSubscription } from '../../hooks';
import { IncidentFields, IncidentControlBar, WorknotesHistory } from './';
import { AttachmentView } from './AttachmentView';
import { DisableBg$ } from '../styled';
import { CustomPrompt } from '../';
import { BASE_URL } from '../../../BASE_URL';
import AttachmentContext from './AttachmentView/AttachmentContext';

function TicketRender({ serverData }) {
	const location = useLocation();
	let { worknotesHistory, ...formData } = serverData;
	const [ isDisabled, setIsDisabled ] = useState(false);
	const [ needToSave, setNeedToSave ] = useState(false);
	const [ isAttachOpened, setIsAttachOpened ] = useState(false);
	const liveData = useSubscription(BASE_URL + location.pathname + '/subscribe');
	const [ worknotesHistoryData, setWorknotesHistoryData ] = useState(worknotesHistory);
	const [ state, handleChange, setState ] = useInputValidation(formData, setNeedToSave);

	useEffect(() => {
		if (liveData) {
			let { worknotesHistory, ...formData } = liveData;
			setWorknotesHistoryData(worknotesHistory);
			setState({ ...state, ...formData });
			compare(liveData, serverData);
		}
	}, [ liveData ]);

	return (
		<Ticket$ className={ isDisabled ? 'disabled' : '' }>
			<CustomPrompt
				when={ needToSave }
				message={ 'Modifications may not be saved.' }
				reason={ 'Do you want to exit this page ?' }
			/>
			{ isAttachOpened && (
				<AttachmentContext>
					<DisableBg$>
						<AttachmentView state={ state } setIsAttachOpened={ setIsAttachOpened } />
					</DisableBg$>
				</AttachmentContext>
			) }

			<IncidentControlBar formControls={ [ state, setIsDisabled, needToSave, setNeedToSave, setIsAttachOpened ] } />

			{ formData.id.slice(0, 3) === 'INC' ? (
				<IncidentFields formControls={ [ state, handleChange ] } />
			) : formData.id.slice(0, 3) === 'REQ' ? (
				<IncidentFields formControls={ [ state, handleChange ] } />
			) : formData.id.slice(0, 3) === 'CHG' ? (
				<IncidentFields formControls={ [ state, handleChange ] } />
			) : '' }

			<WorknotesHistory
				worknotesHistory={ worknotesHistoryData || worknotesHistory }
				fileList={ state.fileList }
			/>
		</Ticket$>
	);
}

export default TicketRender;

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





