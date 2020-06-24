function withThrottling(fun, delay) {
	let token;
	return function (...args) {
		clearTimeout(token);
		token = setTimeout(() => fun(...args), delay);
	};
}

export default withThrottling;