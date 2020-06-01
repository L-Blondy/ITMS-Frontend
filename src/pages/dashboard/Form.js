import React, { useRef, useEffect } from 'react';
import Input from './Input';
import { InputLabelLeft$ } from '../../components/inputs';

const Form = React.forwardRef(({ validation, ...props }, ref) => {

	const handleSubmit = (e) => {
		e.preventDefault();
		const elements = [].slice.call(e.target.elements);
		elements.forEach(el => el.setErrors && el.setErrors());
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
		</form>
	);
});

export default Form;
