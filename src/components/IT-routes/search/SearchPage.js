import styled from 'styled-components';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CLR } from '../../../GlobalStyles';
import { UserCtx } from '../../../GlobalContext';
import { ItRoutesCtx } from '../ItRoutesWithContext';
import { Tickets } from './';
import { http } from '../../../utils';
import { ControlBar$ } from '../';
import { BASE_URL } from '/BASE_URL';

function SearchPage({ initialData }) {

	const { incidentSearchProps, searchLimit } = useContext(UserCtx);
	const itRoutesCtx = useContext(ItRoutesCtx);
	const [ skip, setSkip ] = useState(1);
	const { type: searchType } = useParams();
	const form = useRef();
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

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		const query = toQueryObject(e.target.elements, { skip: 0, limit: searchLimit });
		handleSendQuery(query);
	};

	const handleChangePage = (e) => {
		e.preventDefault();
		const toDisplay = skip + parseInt(e.target.value || 0);
		const toSkip = toDisplay - 1;
		const query = { ...state.previousQuery, skip: toSkip, limit: searchLimit };
		setSkip(toDisplay);
		handleSendQuery(query);
	};

	return (<>
		<ControlBar$>
			<div />
			<SkipForm$ onSubmit={ handleChangePage }>
				<button
					type='button'
					name='previous'
					className='previous'
					value={ - searchLimit }
					onClick={ handleChangePage }
					disabled={ state.skipped === 0 }
				/>
				<input
					type='number'
					name='skip'
					id='skip'
					value={ skip }
					onChange={ e => setSkip(parseInt(e.target.value)) }
					min="1"
					max={ state.resultsCount }
				/>
				<label htmlFor='skip'>
					{ `- ${ Math.min(state.skipped + searchLimit, state.resultsCount) } of ${ state.resultsCount }` }
				</label>
				<button
					type='button'
					name='next'
					className='next'
					value={ searchLimit }
					onClick={ handleChangePage }
					disabled={ state.skipped + searchLimit >= state.resultsCount - 1 }
				/>
			</SkipForm$>
		</ControlBar$>
		<Form$ onSubmit={ handleSubmitSearch } ref={ form }>
			<Tickets
				when={ searchType.isOneOf([ 'incidents', 'requests', 'changes' ]) }
				tickets={ state.results }
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
	height: 100%;
	overflow: auto;
`;

const SkipForm$ = styled.form`
	display: flex;
	align-items: center;

	input {
		width: 3em;
		text-align: right;
		margin-right: 0.5em;
	}

	button:disabled {
		opacity: 0.33;
		cursor: default
	}

	button {
		width: 2em;
		position: relative;
		height: 100%;
		background: none;
		margin: 0 0.3em;

		&::before{
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			border: 6px solid transparent;
		}

		&.next::before {
			border-left: 8px solid #004e58;
			margin-left: 3px;
		}

		&.previous::before {
			border-right: 8px solid #004e58;
			margin-left: -3px;
		}
	}
`;

