import styled from 'styled-components';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils';
import { CLR } from '../../../GlobalStyles';
import { Input } from '../../';
import { propNameMap } from './';

function Tickets({ when, tickets, searchProps }) {

	if (!when) return null;

	const MAP = searchProps.reduce((componentMap, prop) => {
		const column = [
			<span
				className='column-name'
				key={ 'a' + prop } >
				{ propNameMap(prop) }
			</span>,
			<label className='column-search-label' htmlFor={ prop } key={ 'b' + prop }>
				<Input
					className='column-search-input'
					type='text'
					name={ prop }
					placeholder='Search'
					size='4'
					id={ prop }
					autoComplete='off'
				/>
			</label>
		];
		tickets.forEach((ticket, i) => {
			let value = ticket[ prop ];
			const isDate = typeof value === 'number' && value > 10 ** 12;
			if (isDate)
				value = formatDate(value);
			if (prop === 'id')
				column.push(
					<Link
						className={ `column-item ${ prop }-item` }
						key={ 'c' + prop + i }
						to={ location.pathname + '/' + value }>
						{ value }
					</Link>
				);
			else
				column.push(
					<span
						className={ `column-item ${ prop }-item` }
						key={ 'd' + prop + i }>
						<div>{ JSON.stringify(value) }</div>
					</span>
				);
		});
		componentMap.push(
			<span
				className='column'
				key={ 'e' + prop }>
				{ column }
			</span>
		);
		return componentMap;
	}, []);

	return (
		<Tickets$>
			{ MAP }
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

		&-name,
		&-item {
			overflow: hidden;
			height: 2.5em;
			line-height: 2.5em;
			white-space: nowrap;
			padding: 0 1em 0 0.5em;
			max-width: 15vw;
		}

		&-name {
			font-weight: bold;
			position: relative;
		}

		&-search-label {
			padding: 0.5em;
			background:  ${ CLR.BACKGROUND.LIGHT };
			border-right: 1px solid #e5e5e5;
		}

		&-search-input {
			width: 100%;
			line-height: 1.5em;
			min-height: 1.5em;
			padding: 0 0.35em;
			border: none;
			border-radius: 3px;
		}

		&-item {
			border-bottom: 1px solid ${ CLR.BORDER.PRIMARY };

			div {
				width: 100%;
				overflow: hidden;
			}
		}

		a {
			color: inherit;
			text-decoration: underline;
		}
	}
`;
