import React, { useEffect, useState, useContext } from 'react';
import { UserCtx } from '../../../GlobalContext';
import { Skipper } from '../../../components/inputs';
import { ControlBar$ } from '../../../components/navs';
import { http } from '../../../utils';
import { BASE_URL } from '/BASE_URL';
import FlexGrid from './FlexGrid';
import { ItPageContainer$$ } from '../../../components/containers';
import { withPreloader } from '../../../higher-order';

function SearchPage({ setIsLoading, Preloader }) {

	const { incidentSearchFields, pageSize } = useContext(UserCtx);
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
		setIsLoading(true);

		setTimeout(() => {
			http()
				.get(BASE_URL + location.pathname, query)
				.then(res => {
					setState(res.searchData);
					setSkipperKey(Math.random());
					setIsLoading(false);
				})
				.catch(err => {
					console.log(err);
					setIsLoading(false);
				});
		}, 500);
	};

	return (
		<ItPageContainer$$>
			<Preloader />
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
		</ItPageContainer$$>
	);
}

export default withPreloader(SearchPage);


