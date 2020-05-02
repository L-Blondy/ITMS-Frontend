import { useCallback, useEffect, useState, useRef } from 'react';
import { toQuery, setHeaders } from '../utils';

XMLHttpRequest.prototype.setHeaders = setHeaders;

function useSubscription(URL, params = {}, headers = {}) {

	const req = useRef(new XMLHttpRequest()).current;
	const [ res, setRes ] = useState('');

	const subscribe = useCallback(() => {
		const query = typeof params === 'string' ? params : toQuery(params);
		req.open("GET", URL + query, true);
		req.setHeaders(headers);
		req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		req.setRequestHeader('Cache-Control', 'no-cache');
		req.msCaching = 'disabled';
		req.send();

	}, [ res ]);

	useEffect(() => {
		subscribe();
		console.log(res);
	}, [ res ]);

	useEffect(() => {
		req.onreadystatechange = () => {
			if (req.readyState === 4) {
				if (req.status >= 400) {
					setTimeout(() => subscribe(), 3000);
				}
				else {
					setRes(JSON.parse(req.response || '[]'));
				}
			}
		};
		return () => req.abort();
	}, []);

	return res;
}

export default useSubscription;


