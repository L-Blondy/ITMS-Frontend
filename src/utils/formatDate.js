const formatDate = (rawDate, timezone = []) => {
	if (!rawDate) return '-';
	const dateAndTime = new Date(rawDate);
	const date = dateAndTime.toLocaleDateString(timezone);
	const time = dateAndTime.toLocaleTimeString(timezone, { hour: '2-digit', minute: '2-digit' });
	return date + '  ' + time;
};

export default formatDate;