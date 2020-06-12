import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from '.';
import { bigArrow } from '/assets/icons';
import { BASE_URL } from '/BASE_URL';
import { http } from '../../../utils';
import { ItRoutesCtx } from '../ItRoutesContext';
import { Button, ButtonPrimary$, ButtonSecondary$ } from '../../../components/buttons';
import { FlexRow$, FlexCol$ } from '../../../components/flex';

function Categories({ categories }) {

	const itRoutesCtx = useContext(ItRoutesCtx);
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
		itRoutesCtx.page.setIsLoading(true);

		setTimeout(() => {
			http()
				.post(BASE_URL + location.pathname, state)
				.then(res => itRoutesCtx.page.setIsLoading(false))
				.catch(err => {
					console.log(err);
					itRoutesCtx.page.setIsLoading(false);
				});
		}, 500);
	};

	return (
		<FlexCol$$>
			<div className='wrapper'>

				<FlexRow$ as='h2' className='title'>{ pageTitle() }</FlexRow$>

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
					<Button styleAs={ ButtonSecondary$ }>Cancel</Button>
				</FlexRow$>
			</div>
		</FlexCol$$>
	);
}

export default Categories;

const FlexCol$$ = styled(FlexCol$)`
	height: 100%;
	justify-content: center;
	align-items: center;

	.title {
		font-weight: normal;
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
			border-radius: 3px;
		}
	}
`;
