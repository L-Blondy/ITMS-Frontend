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
	errors = [],
	...props
}, ref) => {
	const [ value, setValue ] = useState(defaultValue || '');

	const Label = ({ htmlFor }) => {
		if (typeof label === 'string')
			return <label htmlFor={ htmlFor }>{ label }</label>;
		return label || null;
	};

	const handleChange = (e) => {
		setValue(e.target.value);
		onChange && onChange(e);
	};

	return (
		<Span$ className={ `labelled-input ${ className } ` } disabled={ props.disabled }>

			<Label htmlFor={ name } />

			<Input
				className={ errors.length ? 'invalid' : '' }
				name={ name }
				id={ name }
				ref={ ref }
				{ ...props }
				value={ props.value || value }
				onChange={ handleChange }
			/>

			{ errors.length ? (
				<div className='errors'>
					{ errors.map((err, i) => (
						<div className='error' key={ name + value + i }>
							{ err }
						</div>
					)) }
				</div>
			) : null }

		</Span$>
	);
});

export default Input;
