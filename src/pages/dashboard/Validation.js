class Validation {

	constructor(form, requirements) {
		this.requirements = requirements;
		this.form = form;
	}

	getErrors(input) {
		console.log(this.form.current.elements);
		const { name, value } = input;
		const inputRequirements = this.requirements[ name ];
		let errors = [];

		for (let requirement in inputRequirements) {
			if (!this[ requirement ])
				throw new Error(`Validation.${ requirement } method does not exist`);
			const error = this[ requirement ](value, inputRequirements[ requirement ]);
			error && errors.push(error);
		}
		return errors;
	}

	required(value, requirement) {
		if (!requirement || value) return;
		return `This field is required`;
	}

	minLength(value, requirement) {
		if (value.length >= requirement) return;
		return `Please type at least ${ requirement } characters`;
	}

	maxLength(value, requirement) {
		if (value.length <= requirement) return;
		return `The maximun characters limit has been exceeded. Please type no more than ${ requirement } characters`;
	}
}

export default Validation;