class Validate {

	static setClassName(target, name, value) {
		console.log(target);
		if (name === 'description'
			|| name === 'instructions'
			|| name === 'category'
			|| name === 'subCategory'
			|| name === 'assignmentGroup'
			|| name === 'assignedTo'
		) {
			if (value)
				target.classList.remove('invalid');
			else
				target.classList.add('invalid');
		}
	}

	static state(state) {
		let isValid = true;

		if (!state[ 'description' ]) {
			document.getElementById('description').classList.add('invalid');
			isValid = false;
		}
		if (!state[ 'instructions' ]) {
			document.getElementById('instructions').classList.add('invalid');
			isValid = false;
		}
		if (!state[ 'category' ]) {
			document.getElementById('category').classList.add('invalid');
			isValid = false;
		}
		if (!state[ 'subCategory' ]) {
			document.getElementById('subCategory').classList.add('invalid');
			isValid = false;
		}
		if (!state[ 'assignmentGroup' ]) {
			document.getElementById('assignmentGroup').classList.add('invalid');
			isValid = false;
		}
		if (!state[ 'assignedTo' ]) {
			document.getElementById('assignedTo').classList.add('invalid');
			isValid = false;
		}
		return isValid;
	}
}

export default Validate;