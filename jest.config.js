module.exports = {
	moduleNameMapper: {
		".+\\.(svg|png|jpg)$": "identity-obj-proxy",
		"^/src([^\\.]*)$": "<rootDir>/src/$1",
		"^/([^\\.]*)$": "<rootDir>/public/$1",
	}
};