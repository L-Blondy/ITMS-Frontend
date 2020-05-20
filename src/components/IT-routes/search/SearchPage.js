import styled from 'styled-components';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CLR } from '../../../GlobalStyles';
import { UserCtx } from '../../../GlobalContext';
import { Tickets } from './';
import { http, dateToNum } from '../../../utils';
import { BASE_URL } from '/BASE_URL';
import { ControlBar$ } from '../';

function SearchPage({ results }) {

	const { incidentSearchProps } = useContext(UserCtx);
	const { type: searchType } = useParams();
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
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	return (
		<Form$ onSubmit={ handleSubmitSearch } ref={ form }>
			<ControlBar$>
				<div></div>
				<input type='number' name='page' min="1" defaultValue={ 1 } />
			</ControlBar$>
			<Tickets
				when={ searchType === 'incidents' || searchType === 'requests' || searchType === 'changes' }
				tickets={ results }
				searchProps={ incidentSearchProps }
			/>
			<button></button>
		</Form$>
	);
}

export default SearchPage;

const Form$ = styled.form`
	
`;

