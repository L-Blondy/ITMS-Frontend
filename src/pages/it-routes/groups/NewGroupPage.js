import styled from 'styled-components';
import React, { useState, useContext, useEffect } from 'react';
import { Input, Select, SelectAsync, InputLabelLeftAbs$ } from '../../../components/inputs';
import { FlexCol$, FlexRow$ } from '../../../components/flex';
import { Button, ButtonItemControl$ } from '../../../components/buttons';
import { http } from '../../../utils';
import { useHistory } from 'react-router-dom';
import { ItRoutesCtx } from '../../it-routes/ItRoutesContext';
import { UserCtx } from '../../../GlobalContext';
import { BASE_URL } from '/BASE_URL';

function NewGroupPage({ initialData }) {

	const [ groupName, setGroupName ] = useState();
	const [ roles, setRoles ] = useState([]);
	const [ users, setUsers ] = useState([]);
	const [ selectedRole, setSelectedRole ] = useState();
	const [ selectedUser, setSelectedUser ] = useState();
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

	const addUser = () => {
		!selectedUser.isOneOf(users) && setUsers([ ...users, selectedUser ]);
		setSelectedUser('');
		setKeyBtn(Math.random());
	};

	const removeUser = (e) => {
		setUsers(users.filter(user => user !== e.target.value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('groupName', groupName);
		console.log('roles', roles);
		console.log('users', users);
		// itRoutesCtx.page.setIsLoading(true);

		// const newGroupData = {
		// 	name:groupName,
		// 	createdOn: Date.now(),
		// 	createdBy: userCtx.name
		// };

		// setTimeout(() => {
		// 	http()
		// 		.post(BASE_URL + location.pathname, newGroupData)
		// 		.then(res => {
		// 			console.log(res.administrationData);
		// 			const nextPathname = location.pathname.split('/').slice(0, -1).join('/') + '/' + groupName;
		// 			history.push(nextPathname);
		// 		})
		// 		.catch(err => {
		// 			console.error(err);
		// 			itRoutesCtx.page.setIsLoading(false);
		// 		});
		// }, 300);
	};

	return (
		<FlexCol$$ as='form' onSubmit={ handleSubmit }>
			<Input
				styleAs={ InputLabelLeftAbs$ }
				label='New group name'
				name='name'
				value={ groupName }
				onChange={ e => setGroupName(e.target.value) }
				autoComplete='off'
			/>

			<FlexRow$ className='line'>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Roles'
					name='roles'
					value={ selectedRole }
					onChange={ option => setSelectedRole(option.value) }
					onKeyDown={ (e) => { selectedRole && e.keyCode === 13 && addRole(); } }
					options={ initialData.roles.reduce((result, role) => {
						if (!role.isOneOf(roles))
							return [ ...result, { value: role, label: role } ];
						return result;
					}, [ { value: '', label: '-none-' } ]) }
				/>

				<Button
					styleAs={ ButtonItemControl$.Add$ }
					className={ selectedRole ? '' : 'disabled' }
					type='button'
					onClick={ addRole }
					key={ keyBtn }
					disabled={ selectedRole ? false : true }
				/>
			</FlexRow$>

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

			<FlexRow$ className='line'>
				<SelectAsync
					name='users'
					queryURL={ BASE_URL + '/it/users' }
					queryProp='value'
					dataNesting={ [ 'userData', 'users' ] }
					styleAs={ InputLabelLeftAbs$ }
					maxResults={ 10 }
					value={ selectedUser }
					onChange={ option => setSelectedUser(option.value) }
					onKeyDown={ (e) => { selectedUser && e.keyCode === 13 && addUser(); } }
					noOptionsMessage={ () => 'No user found' }
					isClearable
				/>

				<Button
					styleAs={ ButtonItemControl$.Add$ }
					className={ selectedUser ? '' : 'disabled' }
					type='button'
					onClick={ addUser }
					key={ keyBtn }
					disabled={ selectedUser ? false : true }
				/>
			</FlexRow$>

			{ users.map(user => (
				<FlexRow$ key={ `${ user.id }-added` }>
					<div >{ user }</div>
					<Button
						styleAs={ ButtonItemControl$.Delete$ }
						type='button'
						onClick={ removeUser }
						value={ user }
					/>
				</FlexRow$>
			)) }

			<button></button>

		</FlexCol$$>
	);
}

export default NewGroupPage;

const FlexCol$$ = styled(FlexCol$)`
	align-items: center;

	& > * {
		margin: 0.7rem;
	}

	input, select, .select {
		width: 230px;
	}

	.line {
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
