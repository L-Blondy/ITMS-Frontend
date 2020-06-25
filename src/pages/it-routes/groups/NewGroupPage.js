import styled from 'styled-components';
import React, { useState, useContext, useEffect } from 'react';
import { Input, Select, SelectAsync, InputLabelTopAbs$ } from '../../../components/inputs';
import { FlexCol$, FlexRow$ } from '../../../components/flex';
import { Button, ButtonItemControl$, ButtonPrimary$ } from '../../../components/buttons';
import { CLR } from '../../../GlobalStyles';
import { http } from '../../../utils';
import { useHistory } from 'react-router-dom';
import { ItRoutesCtx } from '../../it-routes/ItRoutesContext';
import { UserCtx } from '../../../GlobalContext';
import { BASE_URL } from '/BASE_URL';
import { NewGroupStages, NewGroupName, NewGroupRoles, NewGroupUsers } from './';

function NewGroupPage({ initialData }) {
	const [ stage, setStage ] = useState(2);
	const [ name, setName ] = useState('');
	const [ roles, setRoles ] = useState([]);
	const [ users, setUsers ] = useState([]);

	const isNextAllowed = () => {
		if (stage === 1) {
			return name.length ? false : true;
		}
		if (stage === 2) {
			console.log(roles.length);
			return roles.length ? false : true;
		}
		if (stage === 3) {
			return users.length ? false : true;
		}
	};

	return (
		<Container$>

			<NewGroupStages stage={ stage } setStage={ setStage } />

			<Form$ onSubmit={ e => e.preventDefault() }>
				<NewGroupName
					when={ stage === 1 }
					name={ name }
					setName={ setName }
				/>
				<NewGroupRoles
					when={ stage === 2 }
					roles={ roles }
					setRoles={ setRoles }
					initialOptions={ initialData.roles }
				/>
				<NewGroupUsers
					when={ stage === 3 }
					users={ users }
					setUsers={ setUsers }
				/>
			</Form$>

			<Button
				styleAs={ ButtonPrimary$$ }
				onClick={ () => setStage(stage + 1) }
				disabled={ isNextAllowed() }>
				Next
			</Button>
		</Container$>
	);
}

export default NewGroupPage;

const Container$ = styled(FlexCol$)`
	height: 100%;
	margin: 4rem;
	align-items: flex-start;
`;

const Form$ = styled.form`
	padding: 2rem 0;

	input, .select {
		width: 230px;
	}
`;

const ButtonPrimary$$ = styled(ButtonPrimary$)`
	padding: 0.2em 1.4em;
`;;






// function NewGroupPage({ initialData }) {

// 	const [ groupName, setGroupName ] = useState();
// 	const [ roles, setRoles ] = useState([]);
// 	const [ users, setUsers ] = useState([]);
// 	const [ selectedRole, setSelectedRole ] = useState();
// 	const [ selectedUser, setSelectedUser ] = useState();
// 	const [ keyBtn, setKeyBtn ] = useState(Math.random());
// 	const itRoutesCtx = useContext(ItRoutesCtx);
// 	const userCtx = useContext(UserCtx);
// 	const history = useHistory();

// 	const addRole = () => {
// 		setRoles([ ...roles, selectedRole ]);
// 		setSelectedRole('');
// 		setKeyBtn(Math.random());
// 	};

// 	const removeRole = (e) => {
// 		setRoles(roles.filter(role => role !== e.target.value));
// 	};

// 	const addUser = () => {
// 		!selectedUser.isOneOf(users) && setUsers([ ...users, selectedUser ]);
// 		setSelectedUser('');
// 		setKeyBtn(Math.random());
// 	};

// 	const removeUser = (e) => {
// 		setUsers(users.filter(user => user !== e.target.value));
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		console.log('groupName', groupName);
// 		console.log('roles', roles);
// 		console.log('users', users);
// 		// itRoutesCtx.page.setIsLoading(true);

// 		// const newGroupData = {
// 		// 	name:groupName,
// 		// 	createdOn: Date.now(),
// 		// 	createdBy: userCtx.name
// 		// };

// 		// setTimeout(() => {
// 		// 	http()
// 		// 		.post(BASE_URL + location.pathname, newGroupData)
// 		// 		.then(res => {
// 		// 			console.log(res.administrationData);
// 		// 			const nextPathname = location.pathname.split('/').slice(0, -1).join('/') + '/' + groupName;
// 		// 			history.push(nextPathname);
// 		// 		})
// 		// 		.catch(err => {
// 		// 			console.error(err);
// 		// 			itRoutesCtx.page.setIsLoading(false);
// 		// 		});
// 		// }, 300);
// 	};

// 	return (
// 		<FlexCol$$ as='form' onSubmit={ handleSubmit }>
// 			<Input
// 				styleAs={ InputLabelTopAbs$ }
// 				label='Group name'
// 				name='name'
// 				value={ groupName }
// 				onChange={ e => setGroupName(e.target.value) }
// 				autoComplete='off'
// 			/>

// 			<Section$>
// 				<FlexRow$>
// 					<Select
// 						styleAs={ InputLabelTopAbs$ }
// 						label='Group roles'
// 						name='roles'
// 						placeholder='Select role...'
// 						value={ selectedRole }
// 						onChange={ option => setSelectedRole(option.value) }
// 						onKeyDown={ (e) => { selectedRole && e.keyCode === 13 && addRole(); } }
// 						options={ initialData.roles.reduce((result, role) => {
// 							if (!role.isOneOf(roles))
// 								return [ ...result, { value: role, label: role } ];
// 							return result;
// 						}, []) }
// 					/>

// 					<Button
// 						styleAs={ ButtonPrimary$ }
// 						className={ selectedRole ? '' : 'disabled' }
// 						type='button'
// 						onClick={ addRole }
// 						key={ keyBtn }
// 						disabled={ selectedRole ? false : true }>
// 						Add role
// 					</Button>
// 				</FlexRow$>
// 			</Section$>

// 			{ roles.map(role => (
// 				<FlexRow$ key={ `${ role }-added` }>
// 					<div >{ role }</div>
// 					<Button
// 						styleAs={ ButtonItemControl$.Delete$ }
// 						type='button'
// 						onClick={ removeRole }
// 						value={ role }
// 					/>
// 				</FlexRow$>
// 			)) }

// 			<FlexRow$ className='section'>
// 				<SelectAsync
// 					label='Group members'
// 					name='users'
// 					placeholder='Search user...'
// 					queryURL={ BASE_URL + '/it/users' }
// 					queryProp='value'
// 					dataNesting={ [ 'userData', 'users' ] }
// 					styleAs={ InputLabelTopAbs$ }
// 					maxResults={ 10 }
// 					value={ selectedUser }
// 					onChange={ option => setSelectedUser(option.value) }
// 					onKeyDown={ (e) => { selectedUser && e.keyCode === 13 && addUser(); } }
// 					noOptionsMessage={ () => 'No user found' }
// 					isClearable
// 				/>

// 				<Button
// 					styleAs={ ButtonPrimary$ }
// 					className={ selectedUser ? '' : 'disabled' }
// 					type='button'
// 					onClick={ addUser }
// 					key={ keyBtn }
// 					disabled={ selectedUser ? false : true }>
// 					Add member
// 				</Button>
// 			</FlexRow$>

// 			{ users.map(user => (
// 				<FlexRow$ key={ `${ user.id }-added` }>
// 					<div >{ user }</div>
// 					<Button
// 						styleAs={ ButtonItemControl$.Delete$ }
// 						type='button'
// 						onClick={ removeUser }
// 						value={ user }
// 					/>
// 				</FlexRow$>
// 			)) }

// 			<button></button>

// 		</FlexCol$$>
// 	);
// }

// export default NewGroupPage;

// const FlexCol$$ = styled(FlexCol$)`
// 	/* align-items: center; */

// 	& > * {
// 		margin-top: 2rem;
// 	}

// 	input, select, .select {
// 		width: 230px;
// 	}

// `;

// const Section$ = styled(FlexRow$)`

// `;
