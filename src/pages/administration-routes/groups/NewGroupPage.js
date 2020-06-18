import styled from 'styled-components';
import React, { useState, useContext } from 'react';
import { Input, InputLabelLeft$ } from '../../../components/inputs';
import { FlexCol$ } from '../../../components/flex';
import { http } from '../../../utils';
import { useHistory } from 'react-router-dom';
import { ItRoutesCtx } from '../../it-routes/ItRoutesContext';
import { UserCtx } from '../../../GlobalContext';
import { BASE_URL } from '/BASE_URL';


function NewGroupPage() {

	const [ name, setName ] = useState();
	const itRoutesCtx = useContext(ItRoutesCtx);
	const userCtx = useContext(UserCtx);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		itRoutesCtx.page.setIsLoading(true);

		const newGroupData = {
			name,
			createdOn: Date.now(),
			createdBy: userCtx.name
		};

		setTimeout(() => {
			http()
				.post(BASE_URL + location.pathname, newGroupData)
				.then(res => {
					console.log(res.administrationData);
					const nextPathname = location.pathname.split('/').slice(0, -1).join('/') + '/' + name;
					history.push(nextPathname);
				})
				.catch(err => {
					console.error(err);
					itRoutesCtx.page.setIsLoading(false);
				});
		}, 300);
	};

	return (
		<FlexCol$$ as='form' onSubmit={ handleSubmit }>
			<Input
				styleAs={ InputLabelLeft$ }
				label='New group name'
				name='name'
				value={ name }
				onChange={ e => setName(e.target.value) }
			/>
		</FlexCol$$>
	);
}

export default NewGroupPage;

const FlexCol$$ = styled(FlexCol$)`
	align-items: center;
`;
