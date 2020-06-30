import styled from 'styled-components';
import React, { useEffect } from 'react';
import { FlexCol$ } from '.././../../components/flex';
import { Input, InputLabelLeftAbs$ } from '.././../../components/inputs';
import { Button, ButtonPrimary$ } from '.././../../components/buttons';
import { useFormValidation } from '../../../hooks';
import requirements from './requirements.json';
import { useSubmitUser } from './helpers';
import { withInitialFetch, withPreloader } from '../../../higher-order';
import { ItPageContainer$$ } from '../../../components/containers';

function NewUserPage({ setIsLoading, Preloader, initialData }) {
	const {
		state,
		errors,
		handleChange,
		validateSubmission,
		submission
	} = useFormValidation({
		requirements,
		initialState: {
			id: initialData.id,
			name: '',
			password: '',
			email: '',
			phone: ''
		}
	});

	const submitUser = useSubmitUser(state, setIsLoading);

	useEffect(() => {
		if (!submission.isValid || !submission.source) return;
		submitUser();
	}, [ submission ]);

	return (
		<ItPageContainer$$$ as='form' onSubmit={ e => e.preventDefault() }>
			<Preloader />

			<Input
				styleAs={ WithErrorRight$ }
				label='ID'
				name='id'
				type='text'
				value={ state.id }
				errors={ errors.id }
				autoComplete='off'
				disabled
			/>

			<Input
				styleAs={ WithErrorRight$ }
				label='Name*'
				name='name'
				value={ state.name }
				onChange={ handleChange }
				errors={ errors.name }
				autoComplete='off'
			/>

			<Input
				styleAs={ WithErrorRight$ }
				label='Password*'
				name='password'
				value={ state.password }
				onChange={ handleChange }
				errors={ errors.password }
				autoComplete='off'
			/>

			<Input
				styleAs={ WithErrorRight$ }
				label='Email'
				name='email'
				value={ state.email }
				onChange={ handleChange }
				errors={ errors.email }
				autoComplete='off'
			/>

			<Input
				styleAs={ WithErrorRight$ }
				label='Phone'
				name='phone'
				value={ state.phone }
				onChange={ handleChange }
				errors={ errors.phone }
				autoComplete='off'
			/>

			<Button
				styleAs={ ButtonPrimary$ }
				onConfirm={ validateSubmission }
				warning={ {
					message: `Do you really want to create user ${ state.id }`,
					disableBg: true
				} }>
				{ `Create user ${ state.id }` }
			</Button>

		</ItPageContainer$$$>
	);
}

export default withPreloader(withInitialFetch(NewUserPage));

const ItPageContainer$$$ = styled(ItPageContainer$$)`
	align-items: center;

	& > .labelled-input, 
	& > button {
		margin: 0.7rem;
		width: 230px;
	}
`;

const WithErrorRight$ = styled(InputLabelLeftAbs$)`
	.errors {
		position: absolute;
		left: 100%;
		top: 50%;
		transform: translateY(-50%);
		margin-left: 0.5rem;
	}
	.error {
		font-size: 0.8em;
		color: red;
		white-space: nowrap;
	}
`;

