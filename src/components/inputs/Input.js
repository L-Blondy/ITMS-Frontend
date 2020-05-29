import React, { useState } from 'react';

function Input({ as = 'input', styleAs: StyleAs = 'label', errorMessage, label, name, className, children, defaultValue, ...props }) {
	const RenderAs = as;

	const [ value, setValue ] = useState(defaultValue || '');

	return (
		<StyleAs className={ className }>
			{ typeof label === 'string' ? <span>{ label }</span> : label }

			<RenderAs
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
