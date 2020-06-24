function toQueryObject(elements, defaultQuery = {}) {
	elements = Array.from(elements);

	return elements.reduce((params, el) => {
		if (!el.value)
			return params;
		let value = el.value;
		params[ el.name ] = value;
		return params;
	}, defaultQuery);
}

export default toQueryObject;