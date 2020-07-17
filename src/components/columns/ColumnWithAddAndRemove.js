import React, { useState } from 'react';
import { useArray } from '#/hooks';
import { Button } from '#/components/buttons';

function ColumnWithAddAndRemove() {

	const [ items, setItems ] = useState([]);
	const { add, remove, moveUp, moveDown } = useArray(items, setItems);

	return (
		<div>
			{
				items.map((item, i) => (
					<div key={ JSON.stringify(item) + i }>
						<span>{ JSON.stringify(item) }</span>
						<Button onClick={ () => moveDown(i) }>Move Down</Button>
						<Button onClick={ () => moveUp(i) }>Move up</Button>
						<Button onClick={ () => remove(i) }>Delete</Button>
					</div>
				))
			}

			<Button onClick={ () => add('some item ' + items.length) }>Add item</Button>
		</div>
	);
}

export default ColumnWithAddAndRemove;
