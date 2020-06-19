import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { FlexCol$ } from '../../../components/flex';
import { Input, InputLabelLeft$ } from '../../../components/inputs';
import { http } from '../../../utils';
import { BASE_URL } from '/BASE_URL';

function UsersPage({ initialData }) {
	const [ filter, setFilter ] = useState();
	const [ users, setUsers ] = useState(initialData.users);

	useEffect(() => {
		http()
			.get(BASE_URL + location.pathname, { value: filter })
			.then(res => {
				setUsers(res.userData.users);
			})
			.catch(err => console.log(err));
	}, [ filter ]);

	return (
		<FlexCol$$>
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
		</FlexCol$$>
	);
}

export default UsersPage;

const FlexCol$$ = styled(FlexCol$)`
	a {
		text-decoration: underline;
	}
`;