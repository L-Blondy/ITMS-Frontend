import React, { useState } from 'react';
import { SelectAsync, InputLabelTopAbs$ } from '#/components/inputs';
import { Button } from '#/components/buttons';
import { FlexRow$ } from '#/components/flex';
import { BASE_URL } from '/BASE_URL';
import { Column, AddItem } from '#/components/columns';

function NewGroupPageSetGroupMembers({ when, users, setUsers }) {
	if (!when) return null;

	const [ members, setMembers ] = useState([]);


	return (
		<div>

			<Column async
				name='Members'
				items={ members }
				setItems={ setMembers }
				addItemRender={ (props) => (
					<AddItem async
						name='add-members'
						placeholder='Add member'
						url={ BASE_URL + '/it/users' }
						filterBy='name'
						dataNesting={ [ 'users' ] }
						noOptionsMessage={ () => 'No user found' }
						{ ...props }
					/>
				) } />
		</div>
	);
}

export default NewGroupPageSetGroupMembers;
