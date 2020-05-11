import { useCallback, useEffect, useState, useRef } from 'react';
import { toQuery, setHeaders } from '../utils';

XMLHttpRequest.prototype.setHeaders = setHeaders;

function useSubscription(URL, params = {}, headers = {}) {

	const req = useRef(new XMLHttpRequest()).current;
	const [ res, setRes ] = useState('');

	const subscribe = useCallback(() => {
		console.log('SUBSCRIBING');
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
		console.log('subscription response', res);
		subscribe();
	}, [ res ]);

	useEffect(() => {
		req.onreadystatechange = () => {
			if (req.readyState === 4 && req.status === 0)
				return;
			if (req.readyState === 4 && req.status >= 400) {
				setTimeout(() => subscribe(), 3000);
			}
			else if (req.readyState === 4) {
				setRes(JSON.parse(req.response || '[]'));
			}
		};
		return () => req.abort();
	}, []);

	return res;
}

export default useSubscription;


