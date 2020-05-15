import styled from 'styled-components';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ItRoutesCtx } from '../ItRoutesWithContext';
import { http } from '../../../utils';
import { BASE_URL } from '../../../../BASE_URL';
import { Warning, DisableBg } from '../../';

function DeleteTicket({ when = true, className }) {
	if (!when)
		return <div></div>;

	const itRoutesCtx = useContext(ItRoutesCtx);
	const history = useHistory();
	const [ isWarning, setIsWarning ] = useState(false);
	const [ isConfirmed, setIsConfirmed ] = useState(false);

	const warn = () => {
		setIsWarning(true);
	};

	const handleChoice = (choice) => {
		setIsConfirmed(choice);
		setIsWarning(false);
	};

	useEffect(() => {
		if (!isConfirmed)
			return;

		itRoutesCtx.page.setIsLoading(true);
		setTimeout(() => {
			http()
				.delete(BASE_URL + location.pathname, '')
				.then(res => {
					if (!res.deletedCount)
						throw new Error('Could not delete');
					history.push('/it/dashboard');
				})
				.catch(err => console.log(err));
		}, 500);

	}, [ isConfirmed ]);

	return (<>
		<Warning
			when={ isWarning }
			message='Are you sure you want to delete this Ticket ?'
			handleChoice={ handleChoice }
		/>

		<Button$ className={ className } onClick={ warn }>
			Delete ticket
		</Button$>
	</>);
}

export default DeleteTicket;

const Button$ = styled.button`
	box-shadow: none;
	background: #904b9d;
	box-shadow: 0 0 0 1px #904b9d;
	color: white;
	padding: 0 0.8rem;
	border-radius: 2px;
	font-weight: bold;
`;
