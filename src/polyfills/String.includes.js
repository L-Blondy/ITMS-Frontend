if (!String.prototype.includes) {
	String.prototype.includes = function (value) {
		if (this.indexOf(value) === -1)
			return false;
		return true;
	};
}
