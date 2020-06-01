import React, { useState } from 'react';

const Input = React.forwardRef( ( {
	as: Input = 'input',
	styleAs: Span$ = 'span',
	errorMessage,
	label,
	name,
	className,
	defaultValue,
	onChange,
	...props
}, ref ) => {

	const [ value, setValue ] = useState( defaultValue || '' );

	const Label = ( { htmlFor } ) => {
		if ( typeof label === 'string' )
			return <label htmlFor={ htmlFor }>{ label }</label>
		return label || null
	}

	const handleChange = ( e ) => {
		setValue( e.target.value )
		onChange && onChange( e )
	}

	return (
		<Span$ className={ 'labelled-input ' + className }>

			<Label htmlFor={ name } />

			<Input
				name={ name }
				id={ name }
				value={ value }
				ref={ ref }
				{ ...props }
				onChange={ handleChange }
			/>

			{ errorMessage && <div>{ errorMessage }</div> }

		</Span$>
	);
} )

export default Input;
