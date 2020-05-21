import styled from 'styled-components';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CLR } from '../../../GlobalStyles';
import { UserCtx } from '../../../GlobalContext';
import { Tickets } from './';
import { http, dateToNum } from '../../../utils';
import { ControlBar$ } from '../';
import { BASE_URL } from '/BASE_URL';
const { min, max } = Math;

function SearchPage({ initialData }) {

	const { incidentSearchProps, searchLimit } = useContext(UserCtx);
	const [ previousQuery, setPreviousQuery ] = useState({ skip: 0, limit: searchLimit });
	const [ results, setResults ] = useState(initialData.results);
	const [ resultsCount, setResultsCount ] = useState(initialData.resultsCount);
	const [ skipped, setSkipped ] = useState(initialData.skipped || 0);

	const { type: searchType } = useParams();
	const form = useRef();

	useEffect(() => console.log(results), [ results ]);

	const sendQuery = (query) => {
		http()
			.get(BASE_URL + location.pathname, query)
			.then(res => {
				setPreviousQuery(query);
				setResults(res.searchData.results);
				setResultsCount(res.searchData.resultsCount);
				setSkipped(res.searchData.skipped);
				restoreFormValues(form, query);
			})
			.catch(err => console.log(err));
	};

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		const query = toQueryObject(e.target.elements, { skip: 0, limit: searchLimit });
		sendQuery(query);
	};

	const handleChangePage = (e) => {
		e.preventDefault();
		const currentSkip = skipped;
		const additionalSkip = parseInt(e.target.value) || 0;
		const totalSkip = min(resultsCount - 1, max(currentSkip + additionalSkip, 0));
		const query = { ...previousQuery, skip: totalSkip };
		sendQuery(query);
	};

	return (<>
		<ControlBar$>
			<div />
			<PageForm$ onSubmit={ handleChangePage }>
				<button
					type='button'
					name='previousPage'
					value={ - searchLimit }
					onClick={ handleChangePage }>
					{ '<' }
				</button>
				<input
					type='number'
					name='skip'
					id='skip'
					min="1"
					max={ resultsCount }
					defaultValue={ skipped + 1 }
				/>
				<label htmlFor='skip'>
					{ `- ${ min(skipped + searchLimit, resultsCount) } of ${ resultsCount }` }
				</label>
				<button
					type='button'
					name='nextPage'
					value={ searchLimit }
					onClick={ handleChangePage }>
					{ '>' }
				</button>
			</PageForm$>
		</ControlBar$>
		<Form$ onSubmit={ handleSubmitSearch } ref={ form }>
			<Tickets
				when={ searchType === 'incidents' || searchType === 'requests' || searchType === 'changes' }
				tickets={ results }
				searchProps={ incidentSearchProps }
			/>
			<button></button>
		</Form$>
	</>);
}

export default SearchPage;

function toQueryObject(elements, defaultObj = {}) {
	elements = Array.prototype.slice.call(elements);

	return elements.reduce((params, el) => {
		if (!el.value)
			return params;
		let value = el.value;
		if (el.name === 'createdOn' || el.name === 'updatedOn' || el.name === 'dueDate') {
			value = dateToNum(value);
		};
		params[ el.name ] = value;
		return params;
	}, defaultObj);
}

function restoreFormValues(form, query) {
	const elements = Array.prototype.slice.call(form.current.elements);
	elements.forEach(el => el.value = query[ el.name ] || '');
	document.querySelector('input#skip').value = query.skip + 1;
}

const Form$ = styled.form`
	
`;

const PageForm$ = styled.form`
	display: flex;
	align-items: center;

	input {
		width: 3em;
		text-align: right;
		margin-right: 0.5em;
	}
`;

