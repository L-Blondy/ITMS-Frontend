import React, { useState } from 'react';

function InputWithState({ defaultValue, ...props }) {

	const [ value, setValue ] = useState(defaultValue || '');

	const bindValue = e => setValue(e.target.value);

	return (
		<input { ...props } value={ value } onChange={ bindValue } />
	);
}

export default InputWithState;
