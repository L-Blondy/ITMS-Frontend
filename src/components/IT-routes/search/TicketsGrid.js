import styled from 'styled-components';
import React from 'react';
import { ColumnName, ColumnData } from '.';
import { Input, InputSearch$ } from '../../inputs';

function TicketsGrid({ tickets, propNames, handleSort, onSubmit }) {

	const sortBy = localStorage.getItem('sortBy');
	const sortOrder = localStorage.getItem('sortOrder');

	return (
		<Form$ onSubmit={ onSubmit }>
			{ propNames.map(propName => (
				<span className='column' key={ 'a' + propName }>
					<ColumnName
						handleSort={ handleSort }
						propName={ propName }
						sorting={ propName !== sortBy ? '' : sortOrder > 0 ? 'ascending' : 'descending' }
					/>
					<Input
						styleAs={ InputSearch$ }
						name={ propName }
						type='text'
						placeholder='Search'
						size='4'
						autoComplete='off'
					/>
					<ColumnData
						tickets={ tickets }
						propName={ propName }
					/>
				</span>
			)) }
			<button />
		</Form$>
	);
}


export default TicketsGrid;

const Form$ = styled.form`
	flex-grow: 1;
	width: 100%;
	height: 100%;
	display: flex;
	font-size: 15px;
	justify-content: stretch;
	overflow: auto;

	.column {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		background: white;
		flex-grow: 1;

		> * {
			min-width: 100%;
			max-width: 15vw;
			height: 2.5em;
			line-height: 2.5em;
			white-space: nowrap;
			display: flex;
			align-items: center;
		}
	}
`;
