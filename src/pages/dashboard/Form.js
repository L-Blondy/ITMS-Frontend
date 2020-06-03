import React, { useRef, useEffect } from 'react';
import Input from './Input';
import { InputLabelLeft$ } from '../../components/inputs';

const Form = React.forwardRef(({ validation, ...props }, ref) => {

	const handleSubmit = (e) => {
		e.preventDefault();
		validation.validateElements();
		if (validation.hasErrors) return;
		console.log('submit');
	};

	return (
		<form { ...props } ref={ ref } onSubmit={ handleSubmit }>
			<Input
				name='test1'
				label='test1'
				validation={ validation }
				styleAs={ InputLabelLeft$ }
				style={ { width: 'auto' } }
			/>
			<br />
			<br />
			<Input
				name='test2'
				label='test2'
				validation={ validation }
				styleAs={ InputLabelLeft$ }
				style={ { width: 'auto' } }
			/>
			<br />
			<br />
			<Input
				name='test3'
				label='test3'
				validation={ validation }
				styleAs={ InputLabelLeft$ }
				style={ { width: 'auto' } }
			/>
			<button />
			<br />
			<br />
			<Input
				name='test4'
				label='test4'
				validation={ validation }
				styleAs={ InputLabelLeft$ }
				style={ { width: 'auto' } }
			/>
			<button />
		</form>
	);
});

export default Form;
