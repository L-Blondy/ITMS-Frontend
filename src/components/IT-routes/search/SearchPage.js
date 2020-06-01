import React, { useEffect, useState, useContext } from 'react';
import { UserCtx } from '../../../GlobalContext';
import { ItRoutesCtx } from '../ItRoutesWithContext';
import { Skipper } from '../../skipper';
import { http } from '../../../utils';
import { ControlBar$$ } from '..';
import FlexSearchGrid from './FlexSearchGrid'
import { BASE_URL } from '/BASE_URL';

function SearchPage ( { initialData } ) {

	const { incidentSearchFields, pageSize } = useContext( UserCtx );
	const itRoutesCtx = useContext( ItRoutesCtx );
	const [ state, setState ] = useState( initialData )
	const [ skipperKey, setSkipperKey ] = useState( Math.random() )

	const newSearch = ( query ) => {
		itRoutesCtx.page.setIsLoading( true );

		setTimeout( () => {
			http()
				.get( BASE_URL + location.pathname, query )
				.then( res => {
					setState( res.searchData )
					setSkipperKey( Math.random() )
					itRoutesCtx.page.setIsLoading( false );
				} )
				.catch( err => {
					console.log( err );
					itRoutesCtx.page.setIsLoading( false );
				} );
		}, 500 );
	}

	return ( <>
		<ControlBar$$>
			<div />
			<Skipper
				onSubmit={ ( startFrom => newSearch( { ...state.query, startFrom } ) ) }
				step={ pageSize }
				startFrom={ state.startFrom }
				maxValue={ state.resultsCount }
				key={ skipperKey }
			/>
		</ControlBar$$>

		<FlexSearchGrid
			onSubmitQuery={ query => newSearch( query ) }
			query={ state.query }
			fields={ incidentSearchFields }
			results={ state.results }
			pageSize={ pageSize }
		/>

	</> );
}

export default SearchPage;
