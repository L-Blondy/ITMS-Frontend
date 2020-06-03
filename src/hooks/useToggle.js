import { useState } from 'react';

function useToggle(defaultValue = false) {
	const [ state, setState ] = useState(defaultValue);

	return [ state, () => setState(!state) ];
}

export default useToggle;
