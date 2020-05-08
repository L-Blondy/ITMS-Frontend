import { useState, useEffect } from 'react';
import { Validate } from '../utils';

function useFormValidation(formData, setNeedToSave) {

	const [ state, setState ] = useState({ ...formData });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNeedToSave(true);

		Validate.setClassName(e.target, name, value);

		setState({
			...state,
			[ name ]: value
		});
	};

	useEffect(() => {
		setState({
			...state,
			priority: 'P' + Math.floor((parseInt(state.urgency) + parseInt(state.impact)) / 2)
		});
	}, [ state.impact, state.urgency ]);

	return [ state, handleChange, setState ];
}

export default useFormValidation;

