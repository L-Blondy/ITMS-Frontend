import React, { useState, useRef, useEffect } from 'react';

const Input = React.forwardRef(({
	as: Input = 'input',
	styleAs: Span$ = 'span',
	label,
	name,
	className,
	defaultValue,
	onChange,
	validation,
	...props
}, ref) => {

	const [ value, setValue ] = useState(defaultValue || '');
	const [ errors, setErrors ] = useState([]);
	let input = ref || useRef();
	useEffect(() => {
		console.log(input.current.name);
		input.current = document.getElementById(name);
	}, []);

	const Label = ({ htmlFor }) => {
		if (typeof label === 'string')
			return <label htmlFor={ htmlFor }>{ label }</label>;
		return label || null;
	};

	const setValidationErrors = () => {
		console.log(name);
		if (!validation) return;
		const errorMessages = validation.getErrors(input.current);
		validation && setErrors(errorMessages);
		return errorMessages.length;
	};

	const handleChange = (e) => {
		setValidationErrors();
		setValue(e.target.value);
		onChange && onChange(e);
	};

	useEffect(() => {
		input.current.setErrors = setValidationErrors;
	}, []);

	return (
		<Span$ className={ `labelled-input ${ errors.length && 'invalid' } ${ className } ` } disabled={ props.disabled }>

			<Label htmlFor={ name } />

			<Input
				name={ name }
				id={ name }
				value={ value }
				ref={ input }
				{ ...props }
				onChange={ handleChange }
			/>

			{ errors.length ? (
				<div>
					{ errors.map((err, i) => (
						<div key={ name + value + i }>
							{ err }
						</div>
					)) }
				</div>
			) : null }

		</Span$>
	);
});

export default Input;
