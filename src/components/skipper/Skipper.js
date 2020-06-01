import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { Input, InputLabelRight$ } from '../inputs';

function Skipper ( { onSubmit, step, startFrom, maxValue } ) {

	const input = useRef()

	const handleSubmit = ( e ) => {
		e.preventDefault()
		const newValue = Math.max( 1, parseInt( e.target.value ) || input.current.value )
		onSubmit( newValue )
	}

	return (
		<Form$ onSubmit={ handleSubmit }>
			<button
				name='previous'
				type='button'
				className='previous'
				value={ Math.max( startFrom - step, 1 ) }
				onClick={ handleSubmit }
				disabled={ startFrom === 1 }
			/>
			<Input
				styleAs={ InputSkip$ }
				name='startFrom'
				label={ `- ${ startFrom } of ${ maxValue }` }
				type='number'
				min={ 1 }
				max={ maxValue }
				defaultValue={ startFrom }
				ref={ input }
			/>
			<button
				name='next'
				type='button'
				className='next'
				value={ startFrom + step }
				onClick={ handleSubmit }
				disabled={ startFrom + step > maxValue }
			/>
		</Form$>
	);
}

export default Skipper;

const InputSkip$ = styled( InputLabelRight$ )`
	input {
		width: 3em;
		text-align: right;
		margin-right: 0.5em;
		padding: 0;
	} 
`;

const Form$ = styled.form`
	display: flex;
	align-items: center;

	button:disabled {
		opacity: 0.33;
		cursor: default
	}

	button {
		width: 2em;
		position: relative;
		height: 100%;
		background: none;
		margin: 0 0.3em;

			&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate( -50%, -50%);
			border: 6px solid transparent;
		}

			&.next::before {
			border-left: 8px solid #004e58;
			margin-left: 3px;
		}

			&.previous::before {
			border-right: 8px solid #004e58;
			margin-left: -3px;
		}
	}
`;
