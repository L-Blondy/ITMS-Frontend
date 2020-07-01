import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from '.';
import { bigArrow } from '/assets/icons';
import { BASE_URL } from '/BASE_URL';
import { http } from '../../../utils';
import { Button, ButtonPrimary$, ButtonSecondary$ } from '../../../components/buttons';
import { FlexRow$ } from '../../../components/flex';
import { FONT_FAM } from '../../../GlobalStyles';
import { withInitialFetch, withPreloader, withLocationMount } from '../../../higher-order';
import { ItPageContainer$$ } from '../../../components/containers';

function CategoriesPage({ setIsLoading, Preloader, initialData: categories }) {

	const [ selectedItem, setSelectedItem ] = useState();
	const [ state, setState ] = useState(categories);
	const [ key, setKey ] = useState(Math.random());
	const params = useParams();

	useEffect(() => {
		setKey(Math.random());
	}, [ state ]);

	const pageTitle = () => {
		const { type } = params;

		const dictionary = {
			'incidents': 'Incident categories',
			'requests': 'Request categories',
			'changes': 'Change categories'
		};
		return dictionary[ type ];
	};

	const updateCat = (catState) => {
		const nextState = catState.reduce((result, cat) => {
			result[ cat ] = [ ...state[ cat ] || [] ];
			return result;
		}, {});
		setState(nextState);
	};

	const updateSubCat = (subCatState) => {
		setState({
			...state,
			[ selectedItem ]: subCatState
		});
	};

	const saveChanges = () => {
		setIsLoading(true);

		setTimeout(() => {
			http()
				.post(BASE_URL + location.pathname, state)
				.then(() => setIsLoading(false))
				.catch(err => {
					console.log(err);
					setIsLoading(false);
				});
		}, 500);
	};

	return (
		<ItPageContainer$$$>
			<Preloader />

			<div className='wrapper'>

				<FlexRow$ as='h1' className='title'>{ pageTitle() }</FlexRow$>

				<FlexRow$ className='columns'>
					<Column
						name='categories'
						key={ 'a' + key }
						items={ Object.keys(state) }
						setSelectedItem={ setSelectedItem }
						selectedItem={ selectedItem }
						updateState={ updateCat }
					/>

					<img className='big-arrow' src={ bigArrow } alt='=>' />

					<Column
						name='sub-categories'
						key={ 'b' + key }
						items={ state[ selectedItem ] }
						selectedItem={ selectedItem }
						updateState={ updateSubCat }
					/>
				</FlexRow$>

				<FlexRow$ className='controls'>
					<Button styleAs={ ButtonPrimary$ } onClick={ saveChanges }>Save</Button>
					<Button styleAs={ ButtonSecondary$ } onClick={ () => setState(categories) }>Cancel</Button>
				</FlexRow$>
			</div>
		</ItPageContainer$$$>
	);
}

export default withLocationMount(withPreloader(withInitialFetch(CategoriesPage)));

const ItPageContainer$$$ = styled(ItPageContainer$$)`
	height: 100%;
	justify-content: center;
	align-items: center;

	.title {
		font-weight: normal;
		font-family: ${ FONT_FAM.SECONDARY };
		font-weight: 600;
		opacity: 0.9;
	}

	.columns {
		margin: 1.5rem 0;
	}

	.big-arrow {
		margin: 0 0.6rem 0 0.7rem;
		opacity:0.1;
		width: 3rem;
	}

	.controls {
		justify-content: center;
		margin: 2rem 0;
		
		button {
			margin: 0.3em;
			min-width: 5.5em;
			font-size: 1.05rem;
		}
	}
`;
