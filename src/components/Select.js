import React from 'react';

function Select({ label, name, onChange, value, children, className }) {
	return (
		<label className={ 'form-element ' + className }>
			<span>{ label }</span>
			<select id={ name } name={ name } onChange={ onChange } value={ value } >
				{ children }
			</select>
		</label>
	);
}

export default Select;
