const formatPropName = (prop) => {
	const dictionary = {
		'id': 'Number',
		'description': 'Description',
		'instructions': 'Instructions',
		'status': 'Status',
		'escalation': 'Escalation count',
		'urgency': 'Urgency',
		'impact': 'Impact',
		'priority': 'Priority',
		'assignmentGroup': 'Assignment group',
		'category': 'Category',
		'subCategory': 'Sub category',
		'createdOn': 'Created on',
		'updatedOn': 'Updated on',
		'dueDate': 'Due date',
		'fileList': 'File list',
		'assignedTo': 'Assigned to',
		'onHoldReason': 'On hold reason',
		'worknotesHistory': 'Worknotes history',
		'__v': 'Update count',
	};

	return dictionary[ prop ] || ' not mapped to any name';
};

export default formatPropName;