import React, { useState } from 'react';

function Input({ defaultValue, ...props }) {

	const [ value, setValue ] = useState(defaultValue || '');

	const bindValue = e => setValue(e.target.value);

	return (
		<input { ...props } value={ value } onChange={ bindValue } />
	);
}

export default React.memo(Input);
