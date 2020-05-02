import { useState, useEffect, useCallback, useRef } from 'react';
import { toQuery, setHeaders } from '../utils';

XMLHttpRequest.prototype.setHeaders = setHeaders;

function useGet(defaultResponse = '', headers = {}) {

	const req = useRef(new XMLHttpRequest()).current;
	const [ res, setRes ] = useState(defaultResponse);
	const [ error, setError ] = useState(null);

	const get = useCallback((url, params = {}) => {
		const query = typeof params === 'string' ? params : toQuery(params);
		req.open("GET", url + query, true);
		req.setHeaders(headers);
		req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		req.setRequestHeader('Cache-Control', 'no-cache');
		req.msCaching = 'disabled';
		req.send();
	}, []);

	useEffect(() => {
		req.onreadystatechange = () => {
			if (req.readyState === 4) {
				if (req.status >= 400) {
					setError({
						status: 400,
						message: req.responseText,
						method: 'GET',
					});
					setRes(defaultResponse);
				}
				else {
					setError(null);
					setRes(JSON.parse(req.response));
				}
			}
		};
	}, []);

	return [ res, get, error ];
}

export default useGet;