import React from 'react'
import { Form, FormTicketSearch$ } from '../../forms';
import { ColumnData } from '.';
import { Input, InputBoxAround$ } from '../../inputs';
import { Button, ButtonSortBy$ } from '../../buttons';
import { formatFieldName, toQueryObject } from '../../../utils';

function FlexSearchGrid ( { fields, results, pageSize, onSubmitQuery, query: previousQuery } ) {

	const sortBy = localStorage.getItem( 'sortBy' );
	const sortOrder = localStorage.getItem( 'sortOrder' );
	const defaultQuery = {
		startFrom: 1,
		limit: pageSize,
		sort: { sortBy, sortOrder }
	}

	const handleNewQuery = ( e ) => {
		e.preventDefault()
		onSubmitQuery( {
			...defaultQuery,
			...toQueryObject( e.target.elements )
		} )
	}

	const handleSortQuery = ( field ) => () => {
		let sortBy = localStorage.getItem( 'sortBy' )
		let sortOrder = parseInt( localStorage.getItem( 'sortOrder' ) )
		const changeSortOrder = field === sortBy

		if ( changeSortOrder ) {
			sortOrder *= -1
		}
		else {
			sortBy = field
			sortOrder = -1
		}
		localStorage.setItem( 'sortBy', sortBy )
		localStorage.setItem( 'sortOrder', sortOrder )

		onSubmitQuery( {
			...previousQuery,
			sort: { sortBy, sortOrder }
		} )
	}

	return (
		<Form styleAs={ FormTicketSearch$ } onSubmit={ handleNewQuery }>
			{
				fields.map( field => (
					<span className='column' key={ 'a' + field }>

						<Button
							styleAs={ ButtonSortBy$ }
							onClick={ handleSortQuery( field ) }
							className={ `column-name ${ field !== sortBy ? '' : sortOrder > 0 ? 'ascending' : 'descending' }` }>
							{ formatFieldName( field ) }
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
					</span>
				) )
			}
			< button />
		</Form>
	)
}

export default FlexSearchGrid
