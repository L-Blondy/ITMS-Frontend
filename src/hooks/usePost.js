import { useState, useEffect, useCallback, useRef } from 'react';

XMLHttpRequest.prototype.setHeaders = setHeaders;

export default function usePost(defaultResponse = '', headers = {}) {

	const req = useRef(new XMLHttpRequest()).current;
	const [ res, setRes ] = useState(defaultResponse);
	const [ error, setError ] = useState(null);

	const post = useCallback((url, params) => {
		const query = typeof params === 'string' ? params : toQueryString(params);
		req.open("POST", url, true);
		req.setHeaders(headers);
		req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		req.setRequestHeader('Cache-Control', 'no-cache');
		req.msCaching = 'disabled';
		req.send(query);
	}, []);

	useEffect(() => {
		req.onreadystatechange = (e) => {
			if (req.readyState === 4) {
				if (req.status >= 400) {
					setError({
						status: 400,
						message: req.responseText,
						method: 'POST',
					});
					setRes(JSON.stringify(defaultResponse));
				}
				else {
					setError(null);
					setRes(JSON.parse(req.response));
				}
			}
		};
	}, []);

	return [ res, post, error ];
}

function toQueryString(obj) {
	let query = '';
	recursion(obj);

	function recursion(obj, prefix = '') {
		for (let key in obj) {
			const val = obj[ key ];

			if (typeof val !== 'object') {
				prefix
					? (
						query += prefix + '[' + key + ']=' + val + '&'
					) : (
						query += key + '=' + val + '&'
					);
			}

			else if (typeof val === 'object') {
				prefix
					? (
						recursion(val, prefix + '[' + key + ']')
					) : (
						recursion(val, key)
					);
			}
		}
	}
	return query.slice(0, -1);
}

function setHeaders(headers) {
	for (let header in headers)
		this.setRequestHeader(header, headers[ header ]);
}
