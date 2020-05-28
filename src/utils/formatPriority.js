const formatPriority = (priority) => {
	const dictionary = {
		'P1': 'P1 - Critical',
		'P2': 'P2 - High',
		'P3': 'P3 - Medium',
		'P4': 'P4 - Non critical',
	};
	return dictionary[ priority ];
};

export default formatPriority;