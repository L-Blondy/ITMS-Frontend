import { useState, useEffect, useRef } from 'react';
import { Validate } from '../utils';

function useFormValidation ( formData ) {

	const [ state, setState ] = useState( { ...formData } );

	const handleChange = ( e ) => {
		const { name, value } = e.target;

		Validate.setClassName( e.target, name, value );

		setState( {
			...state,
			[ name ]: value
		} );
	};

	useEffect( () => {
		setState( {
			...state,
			priority: 'P' + Math.floor( ( parseInt( state.urgency ) + parseInt( state.impact ) ) / 2 )
		} );
	}, [ state.impact, state.urgency ] );

	return [ state, handleChange, setState ];
}

export default useFormValidation;

