import styled from 'styled-components';
import React, { useState } from 'react';
import { Column, AddItem } from '#/components/columns';
import { bigArrow } from '/assets/icons';
import { BASE_URL } from '/BASE_URL';
import { http } from '#/utils';
import { Button, ButtonPrimary$, ButtonSecondary$ } from '#/components/buttons';
import { FlexRow$ } from '#/components/flex';
import { ItPageContainer$$ } from '#/components/containers';
import { withInitialFetch, withPreloader, withLocationMount } from '#/higher-order';
import { useSetCategories, usePageTitle } from './helpers';
import { FONT_FAM } from '#/GlobalStyles';

function CategoriesPage({ setIsLoading, Preloader, initialData }) {

	const [ selectedCategory, setSelectedCategory ] = useState([]);
	const [ state, setState ] = useState(initialData);
	const [ setCategories, setSubCategories ] = useSetCategories(state, setState, selectedCategory);
	const pageTitle = usePageTitle();

	const handleSelect = (item) => {
		setSelectedCategory([ item ]);
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

	const cancelChanges = () => setState(initialData);

	return (
		<ItPageContainer$$$>
			<Preloader />

			<div className='wrapper'>

				<FlexRow$ as='h1' className='title'>{ pageTitle }</FlexRow$>

				<FlexRow$ className='columns'>
					<Column
						name='categories'
						items={ Object.keys(state) }
						setItems={ setCategories }
						selectedItems={ selectedCategory }
						handleSelect={ handleSelect }
						displayAddItem={ true }
						withReorder
						addItemRender={ (props) => (
							<AddItem { ...props } placeholder='Add category' />
						) }
					/>

					<img className='big-arrow' src={ bigArrow } alt='=>' />

					<Column
						name='sub-categories'
						items={ state[ selectedCategory ] }
						setItems={ setSubCategories }
						displayAddItem={ !!state[ selectedCategory ] }
						withReorder
						addItemRender={ (props) => (
							<AddItem
								autoFocus
								placeholder='Add sub-category'
								{ ...props }
							/>
						) }
					/>
				</FlexRow$>

				<FlexRow$ className='controls'>
					<Button styleAs={ ButtonPrimary$ } onClick={ saveChanges }>Save</Button>
					<Button styleAs={ ButtonSecondary$ } onClick={ cancelChanges }>Cancel</Button>
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
