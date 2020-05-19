import styled from 'styled-components';
import React, { useEffect } from 'react';
import { formatDate } from '../../../utils';
import { CLR } from '../../../GlobalStyles';

const ticketProps = [
	'id',
	'status',
	'priority',
	'createdOn',
	'updatedOn',
	'dueDate',
	'description',
	'escalation',
	'category',
	'subCategory',
	'assignmentGroup',
	'assignedTo',
	'__v'
];

function SearchPage({ results }) {

	function ticketMap(tickets) {
		return ticketProps.reduce((componentMap, prop) => {
			const column = [
				<span
					className='column-name'
					key={ Math.random() } >
					{ prop }
				</span>
			];
			tickets.forEach((ticket, i) => {
				let value = ticket[ prop ];
				if (typeof value === 'number' && value > 10 ** 12)
					value = formatDate(value);

				column.push(
					<span
						className={ `column-item ${ prop }-item` }
						key={ i + Math.random() }>
						{ value }
					</span>
				);
			});
			componentMap.push(
				<span
					className='column'
					key={ Math.random() }>
					{ column }
				</span>
			);
			return componentMap;
		}, []);
	}

	return (
		<SearchPage$>
			{ ticketMap(results) }
		</SearchPage$>
	);
}

export default SearchPage;

const SearchPage$ = styled.div`
	height: 100%;
	overflow-y: scroll;
	display: flex;

	.column {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		outline: 1px solid ${ CLR.BORDER.PRIMARY };
		background: white;

	}

	.column-name,
	.column-item {
		overflow: hidden;
		height: 2em;
		line-height: 2em;
		max-width: 9em;
		padding: 0 0.5rem;
	}
`;

