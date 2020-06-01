const setPriority = () => {
	const urgency = parseInt(document.getElementById('urgency').value);
	const impact = parseInt(document.getElementById('impact').value);
	const priority = 'P' + Math.floor((urgency + impact) / 2);
	document.getElementById('priority').value = priority;
};

export default setPriority;