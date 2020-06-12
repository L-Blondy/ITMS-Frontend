function compareObjects(obj1, obj2) {
	const keys = Object.keys(obj1);

	return keys.reduce((changedProps, key) => {
		const val1 = obj1[ key ];
		const val2 = obj2[ key ];
		if (val1 !== val2)
			return [ ...changedProps, key ];
		return changedProps;
	}, []);
}

export default compareObjects;