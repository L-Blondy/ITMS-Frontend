import React from 'react';
import { Input, InputCommon$ } from '#/components/inputs';

function NewGroupPageSetGroupName({ when, name, setName }) {
	if (!when) return null;

	return (
		<Input
			styleAs={ InputCommon$ }
			label='Group name:'
			name='name'
			value={ name }
			onChange={ e => setName(e.target.value) }
			placeholder='Group name'
			autoComplete='off'
		/>
	);
}

export default NewGroupPageSetGroupName;
