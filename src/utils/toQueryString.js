function toQueryString(obj) {
	let query = '';
	recursion(obj);

	function recursion(obj, prefix = '') {
		for (let key in obj) {
			const val = obj[ key ];

			if (typeof val === 'string' || typeof val === 'number') {
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
export default toQueryString;