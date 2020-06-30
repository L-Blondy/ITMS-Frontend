import styled from 'styled-components';
import React from 'react';
import { ColumnData } from '.';
import { FlexRow$, FlexCol$ } from '../../../components/flex';
import { Input, InputBoxAround$ } from '../../../components/inputs';
import { Button, ButtonSortBy$ } from '../../../components/buttons';
import { formatFieldName, toQueryObject } from '../../../utils';

function FlexSearchGrid({ fields, results, pageSize, onSubmitQuery, query: previousQuery }) {

	const sortBy = localStorage.getItem('sortBy');
	const sortOrder = localStorage.getItem('sortOrder');
	const defaultQuery = {
		startFrom: 1,
		limit: pageSize,
		sort: { sortBy, sortOrder }
	};

	const handleNewQuery = (e) => {
		e.preventDefault();
		onSubmitQuery({
			...defaultQuery,
			...toQueryObject(e.target.elements)
		});
	};

	const handleSortQuery = (field) => () => {
		let sortBy = localStorage.getItem('sortBy');
		let sortOrder = parseInt(localStorage.getItem('sortOrder'));
		const changeSortOrder = field === sortBy;

		if (changeSortOrder) {
			sortOrder *= -1;
		}
		else {
			sortBy = field;
			sortOrder = -1;
		}
		localStorage.setItem('sortBy', sortBy);
		localStorage.setItem('sortOrder', sortOrder);

		onSubmitQuery({
			...previousQuery,
			sort: { sortBy, sortOrder }
		});
	};

	return (
		<FlexRow$$ as='form' onSubmit={ handleNewQuery }>
			{
				fields.map(field => (
					<FlexCol$$ className='xs-1' key={ 'a' + field }>

						<Button
							styleAs={ ButtonSortBy$ }
							onClick={ handleSortQuery(field) }
							className={ `column-name ${ field !== sortBy ? '' : sortOrder > 0 ? 'ascending' : 'descending' }` }>
							{ formatFieldName(field) }
						</Button>

						<Input
							styleAs={ InputBoxAround$ }
							name={ field }
							type='text'
							placeholder='Search'
							size='4'
							autoComplete='off'
						/>

						<ColumnData
							tickets={ results }
							field={ field }
						/>
					</FlexCol$$>
				))
			}
			<button />
		</FlexRow$$>
	);
}

export default FlexSearchGrid;

const FlexRow$$ = styled(FlexRow$)`
	overflow: auto;
	flex-grow: 1;
	flex-shrink: 0;
	/* height: 100%; */
`;

const FlexCol$$ = styled(FlexCol$)`
	flex-grow: 1;
	flex-basis: 6em !important;
	white-space: nowrap;
	flex-shrink: 0;
	background: white;

	> * {
		min-width: 100%;
		max-width: 15vw;
		height: 2.5em;
		line-height: 2.5em;
		white-space: nowrap;
		display: flex;
		align-items: center;
	}
`;
