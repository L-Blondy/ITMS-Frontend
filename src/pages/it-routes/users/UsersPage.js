import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Input, InputLabelLeft$ } from '../../../components/inputs';
import { http } from '../../../utils';
import { BASE_URL } from '/BASE_URL';
import { ItPageContainer$$ } from '../../../components/containers';

function UsersPage() {
	const [ filter, setFilter ] = useState();
	const [ users, setUsers ] = useState();

	useEffect(() => {
		http()
			.get(BASE_URL + location.pathname, { value: filter })
			.then(res => {
				setUsers(res.users);
			})
			.catch(err => console.log(err));
	}, [ filter ]);

	return (
		<ItPageContainer$$$>
			<h1>
				UsersPage
			</h1>

			<Input
				styleAs={ InputLabelLeft$ }
				label='filter'
				value={ filter }
				onChange={ e => setFilter(e.target.value) }
			/>
			{ users && users.map(user => (
				<div key={ user.id }>
					<a href={ `${ location.pathname }/${ user.id }` }>{ user.id }</a>
					<span> : { user.name }</span>
				</div>
			)) }
		</ItPageContainer$$$>
	);
}

export default UsersPage;

const ItPageContainer$$$ = styled(ItPageContainer$$)`
	a {
		text-decoration: underline;
	}
`;