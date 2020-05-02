import { useState } from 'react';

function useInput(defaultValue) {

	const [ value, setValue ] = useState(defaultValue);

	const bindInput = {
		value,
		onChange: (e) => setValue(e.target.value)
	};

	return [ value, bindInput, setValue ];
}

export default useInput;
