function setHeaders(headers) {
	for (let header in headers)
		this.setRequestHeader(header, headers[ header ]);
}

export default setHeaders;