import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import { UserCtx } from '../../GlobalContext';
import { ItRoutesCtx } from '../../components/IT-routes/ItRoutesWithContext';
import { Skipper } from '../../components/skipper';
import { FlexRowWrap$ } from '../../components/flex';
import { ControlBar$ } from '../../components/navs';
import FlexGrid from './FlexGrid';
import { http } from '../../utils';
import { BASE_URL } from '/BASE_URL';

function SearchPage({ initialData }) {

	const { incidentSearchFields, pageSize } = useContext(UserCtx);
	const itRoutesCtx = useContext(ItRoutesCtx);
	const [ state, setState ] = useState(initialData);
	const [ skipperKey, setSkipperKey ] = useState(Math.random());

	const newSearch = (query) => {
		itRoutesCtx.page.setIsLoading(true);

		setTimeout(() => {
			http()
				.get(BASE_URL + location.pathname, query)
				.then(res => {
					setState(res.searchData);
					setSkipperKey(Math.random());
					itRoutesCtx.page.setIsLoading(false);
				})
				.catch(err => {
					console.log(err);
					itRoutesCtx.page.setIsLoading(false);
				});
		}, 500);
	};

	return (
		<FlexRowWrap$$>
			<ControlBar$>
				<div />
				<Skipper
					onSubmit={ (startFrom => newSearch({ ...state.query, startFrom })) }
					step={ pageSize }
					startFrom={ state.startFrom }
					maxValue={ state.resultsCount }
					key={ skipperKey }
				/>
			</ControlBar$>
			<FlexGrid
				onSubmitQuery={ query => newSearch(query) }
				query={ state.query }
				fields={ incidentSearchFields }
				results={ state.results }
				pageSize={ pageSize }
			/>
		</FlexRowWrap$$>
	);
}

export default SearchPage;

const FlexRowWrap$$ = styled(FlexRowWrap$)`
	max-width: 100%;
`;