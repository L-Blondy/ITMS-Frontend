function withThrottling(delay) {
	return function (fun) {
		let token;
		return function (...args) {
			clearTimeout(token);
			token = setTimeout(() => fun(...args), delay);
		};
	};
}

export default withThrottling;