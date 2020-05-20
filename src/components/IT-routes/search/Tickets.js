import styled from 'styled-components';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils';
import { CLR } from '../../../GlobalStyles';

function Tickets({ when, tickets, searchProps }) {

	if (!when) return null;

	useEffect(() => console.log('MOUNT TICKETS'), []);

	return (
		<Tickets$>
			{
				searchProps.reduce((componentMap, prop) => {
					const column = [
						<span
							className='column-name'
							key={ 'a' + Math.random() } >
							{ prop }
						</span>,
						<label className='column-search-label' htmlFor={ prop } key={ 'b' + Math.random() }>
							<input
								className='column-search-input'
								type='text'
								name={ prop }
								placeholder='Search'
								size='4'
								id={ prop }
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
									key={ i + Math.random() }
									to={ location.pathname + '/' + value }>
									{ value }
								</Link>
							);
						else
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
				}, [])
			}
		</Tickets$>
	);
}

export default Tickets;

const Tickets$ = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	overflow-x: scroll;
	font-size: 15px;

	.column {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		background: white;

		&-name,
		&-item {
			overflow: hidden;
			min-height: 2.5em;
			line-height: 2.5em;
			max-width: 10em;
			white-space: nowrap;
			padding: 0 1em 0 0.5em;
		}

		&-name {
			font-weight: bold;
			position: relative;
			
		}

		&-search-label {
			max-width: 10em;
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
		}

		a {
			color: inherit;
			text-decoration: underline;
		}
	}
`;
