import styled from 'styled-components';
import React from 'react';

function SkipController({ handleChangePage, searchLimit, skip, setSkip, state }) {
	return (
		<Form$ onSubmit={ handleChangePage }>
			<button
				type='button'
				name='previous'
				className='previous'
				value={ - searchLimit }
				onClick={ handleChangePage }
				disabled={ state.skipped === 0 }
			/>
			<input
				type='number'
				name='skip'
				id='skip'
				value={ skip }
				onChange={ e => setSkip(parseInt(e.target.value)) }
				min="1"
				max={ state.resultsCount }
			/>
			<label htmlFor='skip'>
				{ `- ${ Math.min(state.skipped + searchLimit, state.resultsCount) } of ${ state.resultsCount }` }
			</label>
			<button
				type='button'
				name='next'
				className='next'
				value={ searchLimit }
				onClick={ handleChangePage }
				disabled={ state.skipped + searchLimit >= state.resultsCount - 1 }
			/>
		</Form$>
	);
}

export default SkipController;

const Form$ = styled.form`
	display: flex;
	align-items: center;

	input {
		width: 3em;
		text-align: right;
		margin-right: 0.5em;
	}

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

		&::before{
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
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
