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
		<Span$ className={ `labelled-input ${ errors.length && 'invalid' } ${ className } ` } disabled={ props.disabled }>

			<Label htmlFor={ name } />

			<Input
				name={ name }
				id={ name }
				value={ value }
				ref={ ref }
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
