import React, { useState } from 'react';

function Input({ as = 'input', errorMessage, label, name, className, ...props }) {
	const RenderAs = as;

	const [ value, setValue ] = useState(props.defaultValue || '');

	return (
		<label htmlFor={ name } className={ 'form-element ' + className }>
			<span>{ label }</span>
			<RenderAs
				id={ name }
				name={ name }
				value={ value }
				onChange={ e => setValue(e.target.value) }
				{ ...props }
			/>
			{ errorMessage && <div>{ errorMessage }</div> }
		</label>
	);
}

export default Input;
