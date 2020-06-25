import React, { useState, useEffect } from 'react';
import { http, functionName, withThrottling } from '../../utils';
import { BASE_URL } from '/BASE_URL';
import Select from './Select';

function SelectAsync({
	queryURL = BASE_URL + location.pathname,
	queryProp,
	dataNesting,
	maxResults = 10,
	...props
}) {
	const [ options, setOptions ] = useState();
	const [ cache, setCache ] = useState({ filter: '' });

	const handleInputChange = (filter) => {
		if (!filter)
			return reset();

		if (!cache.filter || filter.length < cache.filter.length)
			return fetchOptions(filter);
	};

	const reset = () => {
		setCache({ filter: '' });
		setOptions([]);
	};

	const fetchOptions = withThrottling(200)((filter) => {
		http()
			.get(queryURL, { [ queryProp ]: filter })
			.then(res => unNestOptions(dataNesting, res))
			.then(rawOptions => {
				if (functionName(rawOptions.constructor) !== 'Array')
					console.warn('SelectAsync data should to be an array, please use the "dataNesting" prop to un-nest the data');

				return rawOptions.reduce((nextOptions, option) => {
					nextOptions.push({ value: option.name, label: option.name });
					return nextOptions;
				}, []);
			})
			.then(nextOptions => {
				setOptions(nextOptions.slice(0, maxResults));
				setCache({ filter, options: nextOptions });
			})
			.catch(err => console.log(err));
	});

	return (
		<Select
			onInputChange={ handleInputChange }
			options={ options }
			{ ...props }
		/>
	);
}

export default SelectAsync;

function unNestOptions(dataNesting, res) {
	return dataNesting.reduce((result, currentNesting) => result[ currentNesting ], JSON.parse(res));
}