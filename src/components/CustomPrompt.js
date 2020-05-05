import React, { useState, useEffect } from 'react';
import { Prompt, useHistory } from 'react-router-dom';

const CustomPrompt = ({ when, message }) => {
	const [ isVisible, setIsVisible ] = useState(false);
	const [ nextLocation, setNextLocation ] = useState();
	const [ isConfirmed, setIsConfirmed ] = useState(false);
	const history = useHistory();

	const handleBlockNavigation = (location) => {
		// console.log(isConfirmed);
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
			{ isVisible && <CustomAlert message={ message } handleConfirmation={ handleConfirmation } /> }
		</>
	);
};

function CustomAlert({ message, handleConfirmation }) {
	return <div>
		<h1>{ message }</h1>
		<button onClick={ () => handleConfirmation(true) }>Yes</button>
		<button onClick={ () => handleConfirmation(false) }>No</button>
	</div>;
}
export default CustomPrompt;

