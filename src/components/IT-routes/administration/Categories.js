import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from '.';
import { bigArrow } from '../../../assets/icons';
import { http } from '../../../utils';
import { BASE_URL } from '/BASE_URL';
import { ItRoutesCtx } from '../ItRoutesWithContext';

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
		console.log(type);
		switch (type) {
			case 'incidents':
				return 'Incident categories';
			case 'requests':
				return 'Request categories';
			case 'changes':
				return 'Change categories';
		}
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

		http()
			.post(BASE_URL + location.pathname, state)
			.then(res => {
				itRoutesCtx.page.setIsLoading(false);
			})
			.catch(err => {
				console.log(err);
				itRoutesCtx.page.setIsLoading(false);
			});
	};

	return (
		<Categories$>
			<div className='wrapper'>

				<h2 className='title'>{ pageTitle() }</h2>

				<div className='columns'>
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
				</div>

				<span className='controls'>
					<button className='btn-contained-prim' onClick={ saveChanges }>Save</button>
					<button className='btn-contained-sec'>Cancel</button>
				</span>
			</div>
		</Categories$>
	);
}

export default Categories;


const Categories$ = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;

	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.title {
		font-weight: normal;
	}
	
	.columns {
		display: flex;
		justify-content: space-between;
		height: 0%;
		min-height: 400px;
		margin: 1.5rem 0;
	}

	.big-arrow {
		margin: 0 0.6rem 0 0.7rem;
		opacity:0.1;
		width: 3rem;
	}

	.controls {
		margin: 2rem auto;
		
		button {
			margin: 0.3em;
			min-width: 5.5em;
			font-size: 1.05rem;
			border-radius: 3px;
		}
	}

`;
