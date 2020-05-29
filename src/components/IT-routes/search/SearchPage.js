import styled from 'styled-components';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { UserCtx } from '../../../GlobalContext';
import { ItRoutesCtx } from '../ItRoutesWithContext';
import { SkipController } from './';
import { http } from '../../../utils';
import { ControlBar$$ } from '../';
import { ColumnData } from '.';
import { Input, InputSearch$ } from '../../inputs';
import { Button, ButtonSortBy$ } from '../../buttons';
import { Form, FormTicketSearch$ } from '../../forms';
import { formatPropName, toQueryObject } from '../../../utils';
import { BASE_URL } from '/BASE_URL';

function SearchPage({ initialData }) {

	const sortBy = localStorage.getItem('sortBy');
	const sortOrder = localStorage.getItem('sortOrder');
	const { incidentSearchProps, pageSize } = useContext(UserCtx);
	const itRoutesCtx = useContext(ItRoutesCtx);
	const [ skip, setSkip ] = useState(1);
	const [ state, setState ] = useState({
		...initialData,
		skipped: 0,
		previousQuery: { skip: 0, limit: pageSize }
	});

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
		const query = { ...state.previousQuery, skip: 0, limit: pageSize, sort: { sortBy, sortOrder } };
		handleSendQuery(query);
	};

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		const sortBy = localStorage.getItem('sortBy');
		const sortOrder = localStorage.getItem('sortOrder');
		const query = toQueryObject(e.target.elements, { skip: 0, limit: pageSize, sort: { sortBy, sortOrder } });
		handleSendQuery(query);
	};

	const handleChangePage = (e) => {
		e.preventDefault();
		let nextSkip;
		if (e.target.name === 'previous') {
			nextSkip = Math.max(skip - pageSize, 1);
		}
		else if (e.target.name === 'next') {
			nextSkip = Math.min(skip + pageSize, state.resultsCount);
		}
		else {
			nextSkip = parseInt(e.target.elements[ 1 ].value);
		}
		const skipQuery = nextSkip - 1;
		const query = { ...state.previousQuery, skip: skipQuery, limit: pageSize };
		setSkip(nextSkip);
		handleSendQuery(query);
	};

	return (<>
		<ControlBar$$>
			<div />
			<SkipController
				handleChangePage={ handleChangePage }
				pageSize={ pageSize }
				skip={ skip }
				setSkip={ setSkip }
				state={ state }
			/>
		</ControlBar$$>

		<Form styleAs={ FormTicketSearch$ } onSubmit={ handleSubmitSearch }>
			{ incidentSearchProps.map(propName => (
				<span className='column' key={ 'a' + propName }>
					<Button
						styleAs={ ButtonSortBy$ }
						onClick={ handleSort }
						className={ `column-name ${ propName !== sortBy ? '' : sortOrder > 0 ? 'ascending' : 'descending' }` }
						data-sortby={ propName } >
						{ formatPropName(propName) }
					</Button>
					<Input
						styleAs={ InputSearch$ }
						name={ propName }
						type='text'
						placeholder='Search'
						size='4'
						autoComplete='off'
					/>
					<ColumnData
						tickets={ state.results }
						propName={ propName }
					/>
				</span>
			)) }
			<button />
		</Form>
	</>);
}

export default SearchPage;
