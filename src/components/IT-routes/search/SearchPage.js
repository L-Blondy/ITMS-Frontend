import styled from 'styled-components';
import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CLR } from '../../../GlobalStyles';
import { UserCtx } from '../../../GlobalContext';
import { Tickets } from './';

function SearchPage({ results }) {

	const { incidentSearchProps } = useContext(UserCtx);
	const { type: searchType } = useParams();

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		console.log(e.target.elements);
	};

	return (
		<Form$ onSubmit={ handleSubmitSearch }>
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
	height: 100%;
	overflow-y: scroll;
	display: flex;
	font-size: 15px;

	.column {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		background: white;

		&-name,
		&-item {
			overflow: hidden;
			min-height: 2.5em;
			line-height: 2.5em;
			max-width: 10em;
			white-space: nowrap;
			padding: 0 1em 0 0.5em;
		}

		&-name {
			font-weight: bold;
			position: relative;
			
		}

		&-search-label {
			max-width: 10em;
			padding: 0.5em;
			background:  ${ CLR.BACKGROUND.LIGHT };
			border-right: 1px solid #e5e5e5;
		}

		&-search-input {
			width: 100%;
			line-height: 1.5em;
			padding: 0 0.35em;
			border: none;
			border-radius: 3px;
		}

		&-item {
			border-bottom: 1px solid ${ CLR.BORDER.PRIMARY };
		}

		a {
			color: inherit;
			text-decoration: underline;
		}
	}
`;

