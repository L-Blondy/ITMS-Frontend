const propNameMap = (prop) => {
	let name;

	switch (prop) {
		case 'id':
			name = 'Number';
			break;
		case 'description':
			name = 'Description';
			break;
		case 'instructions':
			name = 'Instructions';
			break;
		case 'status':
			name = 'Status';
			break;
		case 'escalation':
			name = 'Escalation count';
			break;
		case 'urgency':
			name = 'Urgency';
			break;
		case 'impact':
			name = 'Impact';
			break;
		case 'priority':
			name = 'Priority';
			break;
		case 'assignmentGroup':
			name = 'Assignment group';
			break;
		case 'category':
			name = 'Category';
			break;
		case 'subCategory':
			name = 'Sub category';
			break;
		case 'createdOn':
			name = 'Created on';
			break;
		case 'updatedOn':
			name = 'Updated on';
			break;
		case 'dueDate':
			name = 'Due date';
			break;
		case 'fileList':
			name = 'File list';
			break;
		case 'assignedTo':
			name = 'Assigned to';
			break;
		case 'onHoldReason':
			name = 'On hold reason';
			break;
		case 'worknotesHistory':
			name = 'Worknotes history';
			break;
		case '__v':
			name = 'Update count';
			break;
		default:
			name = prop + ' not mapped to any name';
	}
	return name;
};

export default propNameMap;