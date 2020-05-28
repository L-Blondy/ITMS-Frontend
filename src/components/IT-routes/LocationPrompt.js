import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Prompt, useHistory } from 'react-router-dom';
import * as Button from '../buttons';

function LocationPrompt({ when = false, message = '', reason = '' }) {

	const [ isVisible, setIsVisible ] = useState(false);
	const [ nextLocation, setNextLocation ] = useState();
	const [ isConfirmed, setIsConfirmed ] = useState(false);
	const history = useHistory();

	const handleBlockNavigation = (location) => {
		if (!isConfirmed) {
			setIsVisible(true);
			setNextLocation(location);
			return false;
		}
		return true;
	};

	const handleConfirmation = (isConfirmed) => {
		if (isConfirmed) {
			setIsConfirmed(true);
		}
		else {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		isConfirmed && history.push(nextLocation);
	}, [ isConfirmed ]);
	return (
		<>
			<Prompt when={ when } message={ handleBlockNavigation } />
			{ isVisible && <CustomAlert
				message={ message }
				reason={ reason }
				handleConfirmation={ handleConfirmation }
			/> }
		</>
	);
};

function CustomAlert({ message, reason, handleConfirmation }) {
	return <Alert$>
		<div className='alert'>
			<div className='message'>{ message }</div>
			<div className='reason'>{ reason }</div>
			<div className='buttons'>
				<Button.Button
					styleAs={ Button.Alert$.Primary$ }
					onClick={ () => handleConfirmation(true) }>
					Exit
				</Button.Button>
				<Button.Button
					styleAs={ Button.Alert$.Secondary$ }
					onClick={ () => handleConfirmation(false) }>
					Cancel
				</Button.Button>
			</div>
		</div>
	</Alert$>;
}
export default LocationPrompt;

const Alert$ = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,0.4);
	z-index: 1001;
	display: flex;
	align-items: center;
	justify-content: center;


	.alert {
		text-align: center;
		overflow: hidden;
		background: white;
		padding: 1rem 4rem
	}
	.message {
		color: #444;
		font-size: 1.2rem;
	}

	.reason {
		color: #888;
		font-size: 1.05rem;
	}

	.message,
	.reason,
	.buttons {
		margin: 1.5rem 0;
	}

	button {
		min-width: 5em;
		margin: 0.2rem 0.35rem 0 0.35rem;
	}
`;

