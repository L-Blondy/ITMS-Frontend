import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils';

function Tickets({ when, tickets, searchProps }) {

	if (!when) return null;

	return (<>
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
		};
	</>);
}

export default Tickets;
