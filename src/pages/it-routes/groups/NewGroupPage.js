import styled from 'styled-components';
import React, { useState, useContext, useEffect } from 'react';
import { Input, Select, InputWithQuery, InputLabelLeftAbs$ } from '../../../components/inputs';
import { FlexCol$, FlexRow$ } from '../../../components/flex';
import { Button, ButtonItemControl$ } from '../../../components/buttons';
import { http } from '../../../utils';
import { useHistory } from 'react-router-dom';
import { ItRoutesCtx } from '../../it-routes/ItRoutesContext';
import { UserCtx } from '../../../GlobalContext';
import { BASE_URL } from '/BASE_URL';


function NewGroupPage({ initialData }) {

	const [ name, setName ] = useState();
	const [ roles, setRoles ] = useState([]);
	const [ selectedRole, setSelectedRole ] = useState();
	const [ keyBtn, setKeyBtn ] = useState(Math.random());
	const itRoutesCtx = useContext(ItRoutesCtx);
	const userCtx = useContext(UserCtx);
	const history = useHistory();

	const addRole = () => {
		setRoles([ ...roles, selectedRole ]);
		setSelectedRole('');
		setKeyBtn(Math.random());
	};

	const removeRole = (e) => {
		setRoles(roles.filter(role => role !== e.target.value));
	};

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
				styleAs={ InputLabelLeftAbs$ }
				label='New group name'
				name='name'
				value={ name }
				onChange={ e => setName(e.target.value) }
			/>

			{ roles.map(role => (
				<FlexRow$ key={ `${ role }-added` }>
					<div >{ role }</div>
					<Button
						styleAs={ ButtonItemControl$.Delete$ }
						type='button'
						onClick={ removeRole }
						value={ role }
					/>
				</FlexRow$>
			)) }

			<FlexRow$ className='new-role'>
				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Roles'
					name='roles'
					value={ selectedRole }
					onChange={ e => { console.log('onChange'); setSelectedRole(e.target.value); } }>
					<option value=''> -select a role- </option>;
					{ initialData.roles.map(role => {
						if (roles.includes(role)) return;
						return <option key={ `${ role }-option` } value={ role }>{ role }</option>;
					}) }
				</Select>

				<Button
					styleAs={ ButtonItemControl$.Add$ }
					className={ selectedRole ? '' : 'disabled' }
					type='button'
					onClick={ addRole }
					key={ keyBtn }
				/>
			</FlexRow$>

			<InputWithQuery$
				queryURL={ BASE_URL + '/it/users' }
				dataNesting={ [ 'userData', 'users' ] }
				styleAs={ InputLabelLeftAbs$ }
				label='Users'
				maxResults={ 10 }
				searchedProps={ [ 'name', 'id' ] }
				mainProp='name'
				singleResultJSX={ user => (
					<FlexRow$ className='single-result'>
						<div>{ user.name }</div>
						<div>{ user.id }</div>
					</FlexRow$>
				) }
			/>

		</FlexCol$$>
	);
}

export default NewGroupPage;

const FlexCol$$ = styled(FlexCol$)`
	align-items: center;

	& > * {
		margin: 0.7rem;
	}

	input, select {
		width: 230px;
	}

	.new-role {
		position: relative;

		button {
			position: absolute;
			left: 100%;
			margin-left: 1rem;
			height: 24px;
			width: 24px;
		}
	}
`;

const InputWithQuery$ = styled(InputWithQuery)`
	.single-result {
		justify-content: space-between;
		padding: 0 0.5em;
		line-height: 1.5em;
	}
`;
