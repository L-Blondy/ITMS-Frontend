if (!Array.from) {
	Array.from = function (target) {
		return [].slice.call(target);
	};
}