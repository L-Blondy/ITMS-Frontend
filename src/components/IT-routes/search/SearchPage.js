import styled from 'styled-components';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CLR } from '../../../GlobalStyles';
import { UserCtx } from '../../../GlobalContext';
import { Tickets } from './';
import { http, dateToNum } from '../../../utils';
import { BASE_URL } from '/BASE_URL';
import { ControlBar$ } from '../';

function SearchPage({ initialData }) {
	console.log(initialData);

	const { incidentSearchProps } = useContext(UserCtx);
	const { type: searchType } = useParams();
	const [ results, setResults ] = useState(initialData.results);
	const [ lastQuery, setLastQuery ] = useState({});
	const [ totalCount, setTotalCount ] = useState(initialData.totalCount);
	const [ pageSize, setPageSize ] = useState(initialData.pageSize);
	const form = useRef();

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		const elements = Array.prototype.slice.call(e.target.elements);

		const params = elements.reduce((params, el) => {
			if (!el.value)
				return params;
			let value = el.value;
			if (el.name === 'createdOn' || el.name === 'updatedOn' || el.name === 'dueDate') {
				value = dateToNum(value);
			};
			params[ el.name ] = value;
			return params;
		}, {});

		http()
			.get(BASE_URL + location.pathname, params)
			.then(res => {
				document.querySelector('input[name=page').value = 1;
				setResults(res.searchData.results);
				setTotalCount(res.searchData.totalCount);
				setPageSize(res.searchData.pageSize);
				setLastQuery(res.searchData.query);
			})
			.catch(err => console.log(err));
	};

	const handleChangePage = (e) => {
		e.preventDefault();
		const page = e.target.elements[ 0 ].value;
		http()
			.get(BASE_URL + location.pathname, { ...lastQuery, page })
			.then(res => {
				console.log(res.searchData.results);
				setResults(res.searchData.results);
				setLastQuery(res.searchData.query);

				console.log(pageSize, lastQuery);
			})
			.catch(err => console.log(err));
	};

	return (<>
		<ControlBar$>
			<div>{ 'total count : ' + totalCount }</div>
			<div>{ 'from: ' + (pageSize * (lastQuery.page - 1) || 0) }</div>
			<div>{ 'to: ' + (pageSize * lastQuery.page || pageSize) }</div>
			<form onSubmit={ handleChangePage }>
				<input type='number' name='page' min="1" defaultValue={ 1 } />
			</form>
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

const Form$ = styled.form`
	
`;

