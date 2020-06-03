import { useState, useEffect, useRef } from 'react';

function useFormValidation({
	requirements,
	initialState = {},
	initialErrors = {},
	getStateChanges = (state, name, value) => ({ [ name ]: value }),
	onValidSubmission
}) {
	const validation = useRef(new Validation(requirements)).current;
	const [ state, setState ] = useState(initialState);
	const [ errors, setErrors ] = useState(initialErrors);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const newErrorsArray = validation.getInputErrors(name, value);
		const stateChanges = getStateChanges(state, name, value);
		setState({ ...state, ...stateChanges });
		setErrors({ ...errors, [ name ]: newErrorsArray });
	};

	const validateSubmission = (e) => {
		e.preventDefault();
		const errors = validation.getFormErrors(state);
		setErrors(errors);
		if (validation.hasErrors) return console.error('Invalid submission.');;
		if (!onValidSubmission) return console.error('onValidSubmission is required @useFormValidation.');
		onValidSubmission(e);
	};

	return {
		state,
		setState,
		errors,
		handleChange,
		validateSubmission,
	};
}

export default useFormValidation;

class Validation {

	constructor(requirements) {
		this.formRequirements = requirements;
		this._hasErrors = false;
	}

	getInputErrors(name, value) {
		const requirements = this.formRequirements[ name ] || {};
		return Object.keys(requirements).reduce((errors, requirement) => {
			const requirementValue = requirements[ requirement ];
			if (!this[ requirement ]) {
				console.error(`No validation for ${ requirement } has been defined.`);
				return errors;
			}
			const error = this[ requirement ](value, requirementValue);
			error && errors.push(error);
			return errors;
		}, []);
	}

	getFormErrors(state) {
		let errors = {};
		this._hasErrors = false;
		for (let name in state) {
			const value = state[ name ];
			const inputErrors = this.getInputErrors(name, value);
			if (inputErrors.length) this._hasErrors = true;
			errors[ name ] = inputErrors;
		}
		return errors;
	}

	get hasErrors() {
		return this._hasErrors;
	}

	required(value, requirementValue) {
		if (!requirementValue) return;
		if (value) return;
		return `This field is required`;
	}

	minLength(value, requirementValue) {
		if (value.length >= requirementValue) return;
		return `Please type at least ${ requirementValue } characters.`;
	}

	maxLength(value, requirementValue) {
		if (value.length <= requirementValue) return;
		return `Please type no more than ${ requirementValue } characters`;
	}
}
