import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Input } from '.';
import { http, functionName } from '../../utils';
import { BASE_URL } from '/BASE_URL';
import { FlexCol$, FlexRow$ } from '../flex';

function InputWithQuery({
	queryURL = BASE_URL + location.pathname,
	dataNesting,
	singleResultJSX,
	maxResults = 10,
	searchedProps,
	mainProp,
	...props
}) {
	const defaultCache = { filter: '', data: [] };
	const [ filter, setFilter ] = useState();
	const [ data, setData ] = useState([]);
	const [ cache, setCache ] = useState(defaultCache);
	const [ selected, setSelected ] = useState('');

	const handleSelect = (data) => {
		setFilter(data[ mainProp ]);
		setSelected(data[ mainProp ]);
	};

	const handleChange = (e) => {
		setFilter(e.target.value);
		setSelected('');
	};

	const reset = () => {
		setCache(defaultCache);
		setData([]);
	};

	const requestData = () => {
		http()
			.get(queryURL, { value: filter })
			.then(res => {
				const nextData = dataNesting.reduce((data, cur) => data[ cur ], JSON.parse(res));
				if (functionName(nextData.constructor) !== 'Array')
					console.warn('InputWithQuery data should to be an array, please use the "dataNesting" prop to un-nest the data');
				setData(nextData.slice(0, maxResults));
				setCache({ filter, data: nextData });
			})
			.catch(err => console.log(err));
	};

	const useCache = () => {
		const nextData = cache.data.filter(data => {
			const regex = new RegExp(filter, 'i');
			let passing = false;
			searchedProps.forEach(prop => {
				if (regex.test(data[ prop ])) passing = true;
			});
			return passing;
		});
		setData(nextData.slice(0, maxResults));
	};

	useEffect(() => {
		if (!filter)
			return reset();

		if (!cache.filter || filter.length < cache.filter.length)
			return requestData();

		useCache();
	}, [ filter ]);

	return (
		<Input value={ filter } onChange={ handleChange } { ...props }>
			{
				!selected && data.length && (
					<FlexCol$ className='inputwithquery-results results'>
						{ data.map((d, i) => (
							<Option$ key={ 'singleResultJSX-' + i } onClick={ () => handleSelect(d) }>
								{ singleResultJSX(d, i) }
							</Option$>
						)) }
					</FlexCol$>
				)
			}
		</Input>
	);
}

export default InputWithQuery;

const Option$ = styled(FlexCol$)`
	&:hover {
		background: lightblue
	}

	* {
		pointer-events: none;
	}
`;

function useQueryLogic(queryURL, dataNesting, maxResults, searchedProps) {
	const defaultCache = { filter: '', data: [] };
	const [ filter, setFilter ] = useState();
	const [ data, setData ] = useState([]);
	const [ cache, setCache ] = useState(defaultCache);
	const [ selected, setSelected ] = useState('');

	const reset = () => {
		setCache(defaultCache);
		setData([]);
	};

	const requestData = () => {
		http()
			.get(queryURL, { value: filter })
			.then(res => {
				const nextData = dataNesting.reduce((data, cur) => data[ cur ], JSON.parse(res));
				if (functionName(nextData.constructor) !== 'Array')
					console.warn('InputWithQuery data should to be an array, please use the "dataNesting" prop to un-nest the data');
				setData(nextData.slice(0, maxResults));
				setCache({ filter, data: nextData });
			})
			.catch(err => console.log(err));
	};

	const useCache = () => {
		const nextData = cache.data.filter(data => {
			const regex = new RegExp(filter, 'i');
			let passing = false;
			searchedProps.forEach(prop => {
				if (regex.test(data[ prop ])) passing = true;
			});
			return passing;
		});
		setData(nextData.slice(0, maxResults));
	};

	useEffect(() => {
		if (!filter)
			return reset();

		if (!cache.filter || filter.length < cache.filter.length)
			return requestData();

		useCache();
	}, [ filter ]);

	return [ filter, setFilter, data, setData ];
}

