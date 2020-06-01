import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils';
import { CLR } from '../../../GlobalStyles';

function ColumnData ( { tickets, field } ) {

	return tickets.reduce( ( columnData, ticket, i ) => {
		let value = ticket[ field ];
		const isDate = typeof value === 'number' && value > 10 ** 12;
		const isObject = typeof value === 'object';

		if ( isDate )
			value = formatDate( value );
		else if ( isObject )
			value = JSON.stringify( value );

		if ( field === 'id' )
			columnData.push(
				<Span$
					as={ Link$ }
					to={ location.pathname + '/' + value }
					key={ 'b' + field + i }>
					{ value }
				</Span$>
			);
		else
			columnData.push(
				<Span$ key={ 'c' + field + i }>
					<div className='value'>{ value }</div>
					<div className='tooltip'>{ value }</div>
				</Span$>
			);
		return columnData;
	}, [] );
};

export default ColumnData;

const Link$ = styled( Link )`
	color: inherit;
	text-decoration: underline;
`;

const Span$ = styled.span`
	position: relative;
	white-space: nowrap;
	padding: 0 1em 0 0.5em;
	border-bottom: 1px solid ${ CLR.BORDER.PRIMARY };

	.value {
		overflow: hidden;
		min-width: 100%;
		max-width: 100%;
		cursor: help;
	}

	.tooltip {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		padding: 0 2em 0 0.5em;
		z-index: 1;
		background: linear-gradient(90deg, #f0f0f0 calc(100% - 2em), transparent 100%);
		display: none;
		max-width: 100%;
		min-width: 100%;
	}

	&:hover .tooltip {
		display: initial;
		overflow: hidden;
		animation: displayTooltip 700ms forwards;

		@keyframes displayTooltip {
			to { max-width: 300%; }
		}
	}
`;

