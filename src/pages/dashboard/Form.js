import React, { useRef, useEffect } from 'react';
import { Input, InputLabelLeft$ } from '../../components/inputs';
import { useFormValidation } from '../../hooks';
import requirements from './requirements.json';

const initialState = {
	test1: '',
	test2: '',
	test3: '',
	test4: '',
};

const Form = React.forwardRef((props, ref) => {

	const { state, errors, handleChange, validateSubmission } = useFormValidation({ requirements, initialState, onValidSubmission });

	function onValidSubmission(e) {
		console.log(e.target.value);
	}

	return (
		<form { ...props } ref={ ref } onSubmit={ validateSubmission }>
			<Input
				name='test1'
				label='test1'
				styleAs={ InputLabelLeft$ }
				style={ { width: 'auto' } }
				value={ state.test1 }
				errors={ errors.test1 }
				onChange={ handleChange }
			/>
			<br />
			<br />
			<Input
				name='test2'
				label='test2'
				styleAs={ InputLabelLeft$ }
				style={ { width: 'auto' } }
				value={ state.test2 }
				errors={ errors.test2 }
				onChange={ handleChange }
			/>
			<br />
			<br />
			<Input
				name='test3'
				label='test3'
				styleAs={ InputLabelLeft$ }
				style={ { width: 'auto' } }
				value={ state.test3 }
				errors={ errors.test3 }
				onChange={ handleChange }
			/>
			<button />
			<br />
			<br />
			<Input
				name='test4'
				label='test4'
				styleAs={ InputLabelLeft$ }
				style={ { width: 'auto' } }
				value={ state.test4 }
				errors={ errors.test4 }
				onChange={ handleChange }
			/>
			<button />
		</form>
	);
});

export default Form;

// function getStateChanges(state, name, value) {
// 	const changes = { [ name ]: value };
// 	if (name === 'category')
// 		changes.subCategory = '';
// 	if (name === 'impact')
// 		changes.priority = 'P' + Math.floor((parseInt(state.urgency) + parseInt(value)) / 2);
// 	if (name === 'urgency')
// 		changes.priority = 'P' + Math.floor((parseInt(state.impact) + parseInt(value)) / 2);
// 	return changes;
// };
