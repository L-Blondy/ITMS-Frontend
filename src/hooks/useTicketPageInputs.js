import { useState } from 'react';
import { Validate } from '../utils';

function useFormValidation(formData, setNeedToSave) {

	const [ state, setState ] = useState({ ...formData });

	const handleChange = (e) => {
		console.log(e.target);
		const { name, value } = e.target;
		setNeedToSave(true);

		const changes = {
			[ name ]: value
		};
		if (name === 'category')
			changes.subCategory = '';
		else if (name === 'impact')
			changes.priority = 'P' + Math.floor((parseInt(state.urgency) + parseInt(value)) / 2);
		else if (name === 'urgency')
			changes.priority = 'P' + Math.floor((parseInt(value) + parseInt(state.impact)) / 2);

		Validate.setClassName(e.target, name, value);

		setState({
			...state,
			...changes
		});
	};

	return [ state, handleChange, setState ];
}

export default useFormValidation;

