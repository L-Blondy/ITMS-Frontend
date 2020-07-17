import React from 'react';
import { Input, InputLabelTopAbs$ } from '#/components/inputs';

function NewGroupPageSetGroupName({ when, name, setName }) {
	if (!when) return null;

	return (
		<Input
			styleAs={ InputLabelTopAbs$ }
			name='name'
			value={ name }
			onChange={ e => setName(e.target.value) }
			placeholder='Group name'
			autoComplete='off'
		/>
	);
}

export default NewGroupPageSetGroupName;
