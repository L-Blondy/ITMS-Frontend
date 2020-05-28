import React, { useState } from 'react';

function Input({ as = 'input', styleAs: StyleAs = 'label', errorMessage, label, name, className, children, ...props }) {
	const RenderAs = as;

	const [ value, setValue ] = useState(props.defaultValue || '');

	return (
		<StyleAs htmlFor={ name } className={ className }>
			<span>{ label }</span>
			<RenderAs
				id={ name }
				name={ name }
				value={ value }
				onChange={ e => setValue(e.target.value) }
				{ ...props }>
				{ children }
			</RenderAs>
			{ errorMessage && <div>{ errorMessage }</div> }
		</StyleAs>
	);
}

export default Input;
