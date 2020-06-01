import React, { useRef, useEffect } from 'react';
import Input from './Input';
import { InputLabelLeft$ } from '../../components/inputs';

const Form = React.forwardRef(({ validation, ...props }, ref) => {

	const handleSubmit = (e) => {
		e.preventDefault();
		const errorCount = validate(e.target);
		if (errorCount) return;
		console.log('submit');
	};
	const validate = (form) => {
		const elements = [].slice.call(form.elements);
		return elements.reduce((errorCount, el) => {
			if (!el.setErrors) return errorCount;
			errorCount += el.setErrors();
			console.log(errorCount);
			return errorCount;
		}, 0);
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
