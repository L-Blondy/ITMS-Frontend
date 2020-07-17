import React from 'react';
import { SelectColumns, InputCommon$ } from '#/components/inputs';

function NewGroupPageSetGroupRoles({ when, roles, setRoles, initialOptions }) {
	if (!when) return null;

	return (
		<SelectColumns
			className='select-roles'
			styleAs={ InputCommon$ }
			minHeight='270px'
			columnWidth='230px'
			columnNameLeft='Available roles'
			columnNameRight='Selected roles'
			options={ initialOptions }
			defaultValues={ roles }
			onChange={ e => setRoles(e.target.value) }
		/>
	);
}

export default NewGroupPageSetGroupRoles;
