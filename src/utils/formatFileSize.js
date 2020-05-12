function formatFileSize(size) {
	if (size < 1000)
		return `(${ size } byte)`;
	size = (size / 1000).toFixed(1);
	if (size < 1000)
		return `(${ size } KB)`;
	size = (size / 1000).toFixed(1);
	if (size < 1000)
		return `(${ size } MB)`;
}

export default formatFileSize;
