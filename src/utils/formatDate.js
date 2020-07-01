const formatDate = (rawDate, timeZone) => {
	if (!rawDate) return '-';
	const dateAndTime = new Date(rawDate);
	const date = dateAndTime.toLocaleDateString([], { timeZone });
	const time = dateAndTime.toLocaleTimeString([], {
		timeZone,
		hour: '2-digit',
		minute: '2-digit'
	});
	return date + '  ' + time;
};

export default formatDate;

// console.log(timeZones);