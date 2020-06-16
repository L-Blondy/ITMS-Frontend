import styled from 'styled-components';
import React, { useEffect } from 'react';
import { FlexRow$, FlexCol$ } from '../../components/flex';
import { Input, InputLogin$ } from '../../components/inputs';
import { Button, ButtonPrimary$ } from '../../components/buttons';
import { useFormValidation } from '../../hooks';
import { useLogin } from './helpers';
import requirements from './requirements.json';

const initialState = {
	username: 'someUsername',
	password: 'somePassword'
};

function Form() {

	const {
		state,
		errors,
		handleChange,
		validateSubmission,
		submission } = useFormValidation({ requirements, initialState });
	const login = useLogin(state);

	useEffect(() => {
		if (!submission.isValid && submission.source) return console.error('Invalid submission', errors);
		login();
	}, [ submission ]);

	return (
		<Form$ as='form' className='form' onSubmit={ validateSubmission }>
			<h2>
				ITMS
			</h2>

			<Input
				styleAs={ InputLogin$ }
				placeholder='Username'
				name='username'
				value={ state.username }
				errors={ errors.username }
				onChange={ handleChange }
				autoComplete='off'
			/>

			<Input
				type='password'
				styleAs={ InputLogin$ }
				placeholder='Password'
				name='password'
				value={ state.password }
				errors={ errors.password }
				onChange={ handleChange }
			/>

			<Button styleAs={ ButtonPrimary$ }>
				Login
			</Button>
		</Form$>
	);
}

export default Form;

const Form$ = styled(FlexCol$)`
	align-items: center;
	padding: 2rem;
	border-radius: 1rem;

	& > * {
		margin: 0.7rem 0;
		line-height: 2.2rem;
	} 

	button {
		width: 100%;
		border-radius: 50px;
		padding: 0;
	}
`;
