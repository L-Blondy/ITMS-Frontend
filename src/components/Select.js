import React, { useState } from 'react';

function Select({ label, name, children, className, ...props }) {

	const [ value, setValue ] = useState(props.defaultValue || '');

	return (
		<label className={ className }>
			<span>{ label }</span>
			<select
				id={ name }
				name={ name }
				value={ value }
				onChange={ e => setValue(e.target.value) }
				{ ...props }>
				{ children }
			</select>
		</label>
	);
}

export default Select;
