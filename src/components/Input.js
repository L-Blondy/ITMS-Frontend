import React from 'react';

function Input({ as = 'input', errorMessage, label, name, className, ...props }) {
	const RenderAs = as;
	return (
		<label htmlFor={ name } className={ 'form-element ' + className }>
			<span>{ label }</span>
			<RenderAs
				id={ name }
				name={ name }
				{ ...props }
			/>
			{ errorMessage && <div>{ errorMessage }</div> }
		</label>
	);
}

export default Input;
