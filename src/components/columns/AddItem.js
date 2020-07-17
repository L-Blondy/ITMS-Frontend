import styled from 'styled-components';
import React, { useState } from 'react';
import { Input, SelectAsync, InputTransparent$ } from '#/components/inputs';
import { Button, ButtonItemControl$ } from '#/components/buttons';

function AddItem({
	when = true,
	styleAs: Style = Form$,
	inputStyle = InputTransparent$,
	buttonStyle = ButtonItemControl$.Add$,
	placeholder,
	onSubmit,
	async = false,
	...props
}) {
	if (!when) return null;

	const [ state, setState ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(state);
	};

	return (
		<Style className='add-item-form' onSubmit={ handleSubmit } >
			{ async ?
				(
					<SelectAsync
						styleAs={ inputStyle }
						name={ placeholder }
						placeholder={ placeholder }
						onChange={ e => setState(e.target.value) }
						{ ...props }
					/>
				) : (
					<Input
						styleAs={ inputStyle }
						name={ placeholder }
						placeholder={ placeholder }
						autoComplete='off'
						onChange={ e => setState(e.target.value) }
						{ ...props }
					/>
				)
			}
			<Button styleAs={ buttonStyle } type='submit' />

		</Style>
	);
}

export default AddItem;

const Form$ = styled.form`
		display: flex;
		margin: 0.5rem;
		margin-top: 1rem;
		border: none;
		border-radius: 30px;
		background: #f3f5f5;

		&:focus-within {
			box-shadow: 0 0 0 2px lightblue;
			background: white;
		}
`;