import styled from 'styled-components';
import React, { useState } from 'react';
import { SelectColumns, InputCommon$ } from '#/components/inputs';

function NewGroupRoles({ when, roles, setRoles, initialOptions }) {
	if (!when) return null;

	return (
		<SelectColumns
			styleAs={ InputCommon$ }
			minHeight='270px'
			columnWidth='230px'
			columnNameLeft='Available roles'
			columnNameRight='Selected roles'
			options={ [ 'choice 1', 'choice 2', 'choice 3', 'choice 4', 'choice 5', 'choice 6', 'choice 7', 'choice 8', 'choice 9' ] }
			defaultValues={ [ 'choice 2', 'choice 8' ] }
		/>
	);
}

export default NewGroupRoles;
