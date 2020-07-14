import { useCallback, useEffect, useState, useRef } from 'react';
import { toQueryString } from '#/utils';

XMLHttpRequest.prototype.setHeaders = function setHeaders(headers) {
	for (let header in headers)
		this.setRequestHeader(header, headers[ header ]);
};

function useSubscription(URL, params = {}, headers = {}) {

	const req = useRef(new XMLHttpRequest()).current;
	const [ res, setRes ] = useState('');

	const subscribe = useCallback(() => {
		const query = typeof params === 'string' ? params : toQueryString(params);
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
	}, [ res ]);

	useEffect(() => {
		req.onreadystatechange = () => {
			if (req.readyState === 4 && req.status >= 400) {
				setTimeout(() => subscribe(), 1000);
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


