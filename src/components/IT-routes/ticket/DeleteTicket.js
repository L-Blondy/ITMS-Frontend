import styled from 'styled-components';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { http } from '../../../utils';
import { BASE_URL } from '../../../../BASE_URL';


function DeleteTicket() {

	const history = useHistory();

	const deleteTicket = () => {
		http()
			.delete(BASE_URL + location.pathname, '')
			.then(res => {
				if (!res.deletedCount)
					throw new Error('Could not delete');
				history.push('/it/dashboard');
			})
			.catch(e => console.log(e));
	};

	return (
		<Button$ onClick={ deleteTicket }>
			Delete ticket
		</Button$>
	);
}

export default DeleteTicket;

const Button$ = styled.button`
	margin-right: auto;
	box-shadow: none;
	background-color: #904b9d;
	color: white;
	padding: 0.2rem 0.8rem;
	border-radius: 3px;
	font-weight: bold;
`;
