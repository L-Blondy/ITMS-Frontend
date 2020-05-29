import React from 'react';

function Form({ styleAs: StyleAs = 'form', ...props }) {
	return (
		<StyleAs { ...props } />
	);
}

export default Form;
