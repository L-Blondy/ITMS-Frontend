import styled from 'styled-components';
import React from 'react';
import { Input, InputSkip$ } from '../../inputs';

function SkipController({ handleChangePage, pageSize, skip, setSkip, state }) {

	return (
		<Form$ onSubmit={ handleChangePage }>
			<button
				name='previous'
				type='button'
				className='previous'
				value={ - pageSize }
				onClick={ handleChangePage }
				disabled={ state.skipped === 0 }
			/>
			<Input
				styleAs={ InputSkip$ }
				label={ `- ${ Math.min(state.skipped + pageSize, state.resultsCount) } of ${ state.resultsCount }` }
				name='skip'
				type='number'
				onChange={ e => setSkip(parseInt(e.target.value)) }
				value={ skip }
				min="1"
				max={ state.resultsCount }
			/>
			<button
				name='next'
				type='button'
				className='next'
				value={ pageSize }
				onClick={ handleChangePage }
				disabled={ state.skipped + pageSize >= state.resultsCount - 1 }
			/>
		</Form$>
	);
}

export default SkipController;

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
