import React, { useState } from 'react';
import Select from 'react-select';

function SelectNew({ onChange, options, label, styleAs: Span$ = 'span', className, errors = [], ...props }) {

	const [ selected, setSelected ] = useState('');

	const handleChange = (option) => {
		setSelected(option);
		onChange && onChange(option);
	};
	return (
		<Span$>
			<label htmlFor={ name }>{ label }</label>

			<select value={ selected.value } onChange={ () => { } } style={ { display: 'none' } }>
				{ options.map(option => (
					<option value={ option.value } key={ option.value }>{ option.label }</option>
				)) }
			</select>

			<Select
				className={ `select ${ className } ${ errors.length ? 'invalid' : '' }` }
				value={ (props.value || props.value === '' || props.value === 0) ? props.value : selected }
				onChange={ handleChange }
				options={ options }
				{ ...props }
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

export default SelectNew;