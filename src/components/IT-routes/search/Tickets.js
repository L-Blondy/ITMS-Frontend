import styled from 'styled-components';
import React, { useEffect } from 'react';
import { ColumnName, ColumnSearchInput, ColumnData } from './';

function Tickets({ when, tickets, propNames, handleSort, sortBy, sortOrder }) {

	if (!when) return null;

	return (
		<Tickets$>
			{ propNames.map(propName => (
				<span className='column' key={ 'a' + propName }>
					<ColumnName
						handleSort={ handleSort }
						propName={ propName }
						sorting={ propName !== sortBy ? '' : sortOrder > 0 ? 'ascending' : 'descending' }
					/>
					<ColumnSearchInput
						propName={ propName }
					/>
					<ColumnData
						tickets={ tickets }
						propName={ propName }
					/>
				</span>
			)) }
		</Tickets$>
	);
}


export default Tickets;

const Tickets$ = styled.div`
	flex-grow: 1;
	width: 100%;
	display: flex;
	font-size: 15px;
	justify-content: stretch;

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
