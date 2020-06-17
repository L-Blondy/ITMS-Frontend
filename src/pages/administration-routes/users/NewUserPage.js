import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { FlexCol$ } from '.././../../components/flex';
import { Input, Select, InputLabelLeftAbs$ } from '.././../../components/inputs';
import { Button, ButtonPrimary$ } from '.././../../components/buttons';
import { useFormValidation } from '../../../hooks';
import requirements from './requirements.json';
import { useSubmitUser } from './helpers';

function NewUserPage({ initialData }) {

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
			groups: []
		}
	});

	const groups = useRef();
	const submitUser = useSubmitUser(state, groups);

	useEffect(() => {
		if (!submission.isValid || !submission.source) return;
		submitUser();
	}, [ submission ]);

	return (
		<FlexCol$$ as='form' onSubmit={ e => e.preventDefault() }>

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
				label='Name'
				name='name'
				type='text'
				value={ state.name }
				onChange={ handleChange }
				errors={ errors.name }
				autoComplete='off'
			/>

			<Input
				styleAs={ WithErrorRight$ }
				label='Password'
				name='password'
				type='text'
				value={ state.password }
				onChange={ handleChange }
				errors={ errors.password }
				autoComplete='off'
			/>

			<Select
				styleAs={ WithErrorRight$ }
				ref={ groups }
				label='Groups'
				name='groups'
				defaultValue={ [] }
				multiple>
				<option value=''> -none- </option>
				{ initialData.groups.map(group => (
					<option value={ group } key={ group }> { group } </option>
				)) }
			</Select>

			<Button
				styleAs={ ButtonPrimary$ }
				onConfirm={ validateSubmission }
				warning={ {
					message: `Do you really want to create user ${ state.id }`,
					disableBg: true
				} }>
				{ `Create user ${ state.id }` }
			</Button>

		</FlexCol$$>
	);
}

export default NewUserPage;

const FlexCol$$ = styled(FlexCol$)`
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