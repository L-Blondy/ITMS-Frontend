import styled from 'styled-components';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { CLR } from '../../../GlobalStyles';
import { UserCtx } from '../../../GlobalContext';
import { ItRoutesCtx } from '../ItRoutesWithContext';
import { TicketsGrid, SkipController } from './';
import { http } from '../../../utils';
import { ControlBar$ } from '../';
import { BASE_URL } from '/BASE_URL';

function SearchPage({ initialData }) {

	const { incidentSearchProps, searchLimit } = useContext(UserCtx);
	const itRoutesCtx = useContext(ItRoutesCtx);
	const [ skip, setSkip ] = useState(1);
	const [ state, setState ] = useState({
		...initialData,
		skipped: 0,
		previousQuery: { skip: 0, limit: searchLimit }
	});

	useEffect(() => console.log('MOUNT SEARCHPAGE'), []);

	const handleSendQuery = (query) => {
		itRoutesCtx.page.setIsLoading(true);
		setTimeout(() => {
			http()
				.get(BASE_URL + location.pathname, query)
				.then(res => {
					setState({ ...res.searchData, previousQuery: query });
					itRoutesCtx.page.setIsLoading(false);
				})
				.catch(err => {
					console.log(err);
					itRoutesCtx.page.setIsLoading(false);
				});
		}, 500);
	};

	const handleSort = (e) => {
		e.preventDefault();
		const sortBy = e.target.dataset.sortby;
		const prevSortBy = localStorage.getItem('sortBy');
		const prevSortOrder = localStorage.getItem('sortOrder');
		if (sortBy === prevSortBy)
			localStorage.setItem('sortOrder', - prevSortOrder);
		localStorage.setItem('sortBy', sortBy);
		const sortOrder = localStorage.getItem('sortOrder');
		const query = { ...state.previousQuery, skip: 0, limit: searchLimit, sort: { sortBy, sortOrder } };
		handleSendQuery(query);
	};

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		const sortBy = localStorage.getItem('sortBy');
		const sortOrder = localStorage.getItem('sortOrder');
		const query = toQueryObject(e.target.elements, { skip: 0, limit: searchLimit, sort: { sortBy, sortOrder } });
		handleSendQuery(query);
	};

	const handleChangePage = (e) => {
		e.preventDefault();
		const nextSkipt = Math.min(state.resultsCount, Math.max(1, skip + parseInt(e.target.value || 0)));
		const skipQuery = nextSkipt - 1;
		const query = { ...state.previousQuery, skip: skipQuery, limit: searchLimit };
		setSkip(nextSkipt);
		handleSendQuery(query);
	};

	return (<>
		<ControlBar$>
			<div />
			<SkipController
				handleChangePage={ handleChangePage }
				searchLimit={ searchLimit }
				skip={ skip }
				setSkip={ setSkip }
				state={ state }
			/>
		</ControlBar$>
		<TicketsGrid
			onSubmit={ handleSubmitSearch }
			tickets={ state.results }
			propNames={ incidentSearchProps }
			handleSort={ handleSort }
		/>
	</>);
}

export default SearchPage;

function toQueryObject(elements, defaultObj = {}) {
	elements = Array.prototype.slice.call(elements);

	return elements.reduce((params, el) => {
		if (!el.value)
			return params;
		let value = el.value;
		params[ el.name ] = value;
		return params;
	}, defaultObj);
}
