import React, { useState, useEffect } from 'react';
import { FlexCol$ } from '../../../components/flex';
import { Input, InputLabelLeft$ } from '../../../components/inputs';
import { http } from '../../../utils';
import { BASE_URL } from '/BASE_URL';

function AllUsersPage({ initialData: { users } }) {
	console.log(users);
	const [ filter, setFilter ] = useState();

	useEffect(() => {
		http()
			.get(BASE_URL + location.pathname, { value: filter })
			.then(res => {
				console.log(res.administrationData);
			})
			.catch(err => console.log(err));
	}, [ filter ]);

	return (
		<FlexCol$>
			<h1>
				AllUsersPage
			</h1>

			<Input
				styleAs={ InputLabelLeft$ }
				label='filter'
				value={ filter }
				onChange={ e => setFilter(e.target.value) }
			/>

			{ users && users.map(user => (
				<div key={ user.id }>
					{ `${ user.id } : ${ user.name }` }
				</div>
			)) }
		</FlexCol$>
	);
}

export default AllUsersPage;
