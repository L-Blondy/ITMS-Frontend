import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


function usePathnameChange(cb) {

	const history = useHistory();
	const [ prevLocation, setPrevLocation ] = useState({});

	useEffect(() => {
		if (history.location.pathname + history.location.search !== prevLocation.pathname + prevLocation.search) {
			cb();
		}
		setPrevLocation(history.location);
	}, [ history.location ]);
}

export default usePathnameChange;
