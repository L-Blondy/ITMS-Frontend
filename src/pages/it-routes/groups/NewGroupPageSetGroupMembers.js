import React, { useState } from 'react';
import { SelectAsync, InputLabelTopAbs$ } from '#/components/inputs';
import { Button } from '#/components/buttons';
import { FlexRow$ } from '#/components/flex';
import { BASE_URL } from '/BASE_URL';
import { ColumnWithAddAndRemove } from '#/components/columns';

function NewGroupPageSetGroupMembers({ when, users, setUsers }) {
	if (!when) return null;

	const [ chosenOption, setChosenOption ] = useState('');

	const addUser = () => {
		console.log(chosenOption);
		setChosenOption('');
	};

	return (
		<div>
			<FlexRow$>
				<SelectAsync
					styleAs={ InputLabelTopAbs$ }
					label='Users'
					name='user-select'
					url={ BASE_URL + '/it/users' }
					filterBy='name'
					dataNesting={ [ 'users' ] }
					noOptionsMessage={ () => 'No user found' }
					value={ chosenOption }
					onChange={ e => setChosenOption(e.target.value) }
				/>
				<Button
					type='button'
					onClick={ addUser }>
					Add
				</Button>
			</FlexRow$>

			<ColumnWithAddAndRemove />
		</div>
	);
}

export default NewGroupPageSetGroupMembers;
