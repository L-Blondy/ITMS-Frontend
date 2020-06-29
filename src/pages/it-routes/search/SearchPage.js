import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import { UserCtx } from '../../../GlobalContext';
import { ItRoutesCtx } from '../ItRoutesContext';
import { Skipper } from '../../../components/inputs';
import { FlexCol$ } from '../../../components/flex';
import { ControlBar$ } from '../../../components/navs';
import { http } from '../../../utils';
import { BASE_URL } from '/BASE_URL';
import FlexGrid from './FlexGrid';

function SearchPage() {

	const { incidentSearchFields, pageSize } = useContext(UserCtx);
	const itRoutesCtx = useContext(ItRoutesCtx);
	const [ state, setState ] = useState({});
	const [ skipperKey, setSkipperKey ] = useState(Math.random());

	useEffect(() => {
		setState({});
		setSkipperKey(Math.random());
		newSearch({
			limit: pageSize,
			sort: {
				sortBy: localStorage.getItem('sortBy'),
				sortOrder: localStorage.getItem('sortOrder')
			}
		});
	}, [ location.pathname ]);

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
		<FlexCol$$>
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
		</FlexCol$$>
	);
}

export default SearchPage;

const FlexCol$$ = styled(FlexCol$)`
	height: 100%;
	font-size: 15px;
`;
