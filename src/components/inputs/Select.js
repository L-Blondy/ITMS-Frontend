import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function SelectNew({ onChange, options = [], label, styleAs: Span$ = 'span', className, errors = [], name, ...props }) {

	const [ selected, setSelected ] = useState(getOptionFromValue(props.value, options));

	const handleChange = (option) => {
		setSelected(option || '');
		onChange && onChange(option || '');
	};

	useEffect(() => {
		if (selected.value == props.value) return;

		setSelected(getOptionFromValue(props.value, options));
	}, [ props.value ]);

	return (
		<Span$>
			<label htmlFor={ name }>{ label }</label>

			<select
				value={ (props.value || props.value === '' || props.value === 0) ? props.value : selected.value }
				name={ name }
				id={ name }
				onChange={ () => { } }
				style={ { display: 'none' } }>
				{ options.map(option => (
					<option value={ option.value } key={ option.value }>{ option.label }</option>
				)) }
			</select>

			<Select
				className={ `select ${ className } ${ errors.length ? 'invalid' : '' }` }
				options={ options.map(option => ({ ...option, name })) }
				{ ...props }
				value={ selected }
				onChange={ handleChange }
			/>

			{ errors.length ? (
				<div className='errors'>
					{ errors.map((err, i) => (
						<div className='error' key={ name + selected.value + i }>
							{ err }
						</div>
					)) }
				</div>
			) : null }
		</Span$>
	);
}

function getOptionFromValue(value, options) {
	return options.reduce((result, option) => {
		if (option.value == value) return option;
		return result;
	}, '');
}

export default SelectNew;