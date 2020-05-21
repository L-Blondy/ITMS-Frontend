import styled from 'styled-components';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CLR } from '../../../GlobalStyles';
import { UserCtx } from '../../../GlobalContext';
import { Tickets } from './';
import { http } from '../../../utils';
import { ControlBar$ } from '../';
import { BASE_URL } from '/BASE_URL';
const { min, max } = Math;

function SearchPage({ initialData }) {

	const { incidentSearchProps, searchLimit } = useContext(UserCtx);
	const { type: searchType } = useParams();
	const wrapper = useRef();
	const form = useRef();
	const [ state, setState ] = useState({
		...initialData,
		skipped: 0,
		previousQuery: { skip: 0, limit: searchLimit }
	});

	const handleSendQuery = (query) => {
		wrapper.current.classList.add('is-loading');

		setTimeout(() => {
			http()
				.get(BASE_URL + location.pathname, query)
				.then(res => {
					setState({ ...res.searchData, previousQuery: query });
					restoreFormValues(form, query);
					wrapper.current.classList.remove('is-loading');
				})
				.catch(err => {
					console.log(err);
					wrapper.current.classList.remove('is-loading');
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
		const currentSkip = state.skipped;
		const additionalSkip = parseInt(e.target.value) || 0;
		const totalSkip = min(state.resultsCount - 1, max(currentSkip + additionalSkip, 0));
		const query = { ...state.previousQuery, skip: totalSkip, limit: searchLimit };
		handleSendQuery(query);
	};

	return (
		<Wrapper$ ref={ wrapper }>
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
						type='text'
						name='skip'
						id='skip'
						defaultValue='1'
						min="1"
						max={ state.resultsCount }
					/>
					<label htmlFor='skip'>
						{ `- ${ min(state.skipped + searchLimit, state.resultsCount) } of ${ state.resultsCount }` }
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
		</Wrapper$>
	);
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

const Wrapper$ = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

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

