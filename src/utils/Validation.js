class Validation {

	constructor(form, requirements) {
		this.form = form;
		this.requirements = requirements;
		this.errorCount = 0;
	}

	getErrors(input) {
		const { name, value } = input;
		const inputRequirements = this.requirements[ name ];
		console.log(name);
		if (!inputRequirements) console.error(`No requirements were set for input ${ name }`);
		let errors = [];

		for (let requirement in inputRequirements) {
			if (!this[ requirement ])
				throw new Error(`Validation.${ requirement } method does not exist`);
			const error = this[ requirement ](value, inputRequirements[ requirement ]);
			error && errors.push(error);
		}
		return errors;
	}

	validateElements() {
		const elements = [].slice.call(this.form.current.elements);
		this.errorCount = elements.reduce((errorCount, el) => {
			if (!el.setErrors) return errorCount;
			errorCount += el.setErrors();
			return errorCount;
		}, 0);
	}

	get hasErrors() {
		return this.errorCount;
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