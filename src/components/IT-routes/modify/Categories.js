import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from './';
import { bigArrow } from '../../../assets/icons';

function Categories({ categories }) {

	const [ selectedItem, setSelectedItem ] = useState();
	const [ state, setState ] = useState(categories);
	const [ key, setKey ] = useState(Math.random());
	const params = useParams();

	useEffect(() => {
		console.log(state[ selectedItem ]);
	}, [ selectedItem ]);

	useEffect(() => {
		setKey(Math.random());
		console.log(state);
	}, [ state ]);

	const pageTitle = () => {
		const { type } = params;
		switch (type) {
			case 'INC':
				return 'Incident categories';
			case 'REQ':
				return 'Request categories';
			case 'CHG':
				return 'Change categories';
		}
	};

	const updateCat = (catState) => {
		const nextState = catState.reduce((result, cat) => {
			result[ cat ] = [ ...state[ cat ] || [] ];
			return result;
		}, {});
		setState(nextState);
		const input = document.querySelector('.add-item-input#categories');
		setTimeout(() => {
			console.log(input);
			input.focus();
		}, 500);
	};

	const updateSubCat = (subCatState) => {
		setState({
			...state,
			[ selectedItem ]: subCatState
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
					<button className='btn-contained-prim'>Save</button>
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
		margin: 0 auto 2rem auto;
		
		button {
			margin: 0.3em;
			min-width: 6em;
			font-size: 1.05rem;
			border-radius: 3px;
		}
	}

`;
