import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Button, ButtonItemControl$ } from '../../buttons';
import { Input, InputAddItem$ } from '../../inputs';
console.log(Input, InputAddItem$);


function Column({ items = [], name, selectedItem, setSelectedItem, updateState }) {

	useEffect(() => {
		if (name === 'sub-categories' && selectedItem)
			document.querySelector('#sub-categories').focus();
	}, []);

	const selectItem = (category) => {
		if (!setSelectedItem)
			return;
		setSelectedItem(category);
	};

	const handleUp = (index) => {
		if (!index)
			return;
		const nextState = [ ...items ];
		[ nextState[ index ], nextState[ index - 1 ] ] = [ nextState[ index - 1 ], nextState[ index ] ];
		updateState(nextState);
	};

	const handleDown = (index) => {
		if (index === items.length - 1)
			return;
		const nextState = [ ...items ];
		[ nextState[ index ], nextState[ index + 1 ] ] = [ nextState[ index + 1 ], nextState[ index ] ];
		updateState(nextState);
	};

	const handleDelete = (index) => {
		const nextState = [ ...items.slice(0, index), ...items.slice(index + 1) ];
		updateState(nextState);
	};

	const handleAdd = (e) => {
		e.preventDefault();
		const value = e.target.elements[ 0 ].value;
		value && updateState([ ...items, value ]);
	};

	return (
		<Wrapper$>
			<span className='column-title'>{ name }</span>
			<Column$>


				{ items.map((category, index) => {
					const isSelected = name === 'categories' && category === selectedItem ? 'selected' : '';
					return (
						<div className={ 'item ' + isSelected } key={ category + index } >
							<span
								className='item-name'
								onClick={ () => selectItem(category) }>
								{ category }
							</span>
							<Button
								styleAs={ ButtonItemControl$.Up$ }
								onClick={ () => handleUp(index) }
							/>
							<Button
								styleAs={ ButtonItemControl$.Down$ }
								onClick={ () => handleDown(index) }
							/>
							<Button
								styleAs={ ButtonItemControl$.Delete$ }
								className='delete-btn'
								onClick={ () => handleDelete(index) }
							/>
						</div>
					);
				}) }

				{ (name === 'categories' || selectedItem) && (
					<form className='add-item-form' onSubmit={ handleAdd }>
						<Input
							styleAs={ InputAddItem$ }
							name={ name }
							placeholder='Add item'
							autoComplete='off'
						/>
						<Button
							styleAs={ ButtonItemControl$.Add$ }
							className='add-item-button'
						/>
					</form>
				) }
			</Column$>
		</Wrapper$>
	);
}

export default Column;

const Wrapper$ = styled.div`
	display: flex;
	flex-direction: column;

	.column-title {
		text-transform: capitalize;
		font-size: 1.1rem;
		line-height: 2em;
	}
`;

const Column$ = styled.div`
	width: 270px;
	border-radius: 5px;
	border: 1px solid #90b7bc;
	padding-top: 0.25rem;
	flex-grow: 1;

	.item {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		text-align: left;
		cursor: pointer;
		height: 30px;

		&.selected {
			background: lightblue;
		}

		&:hover:not(.selected),
		&:focus:not(.selected) {
			background: #f4f9fa;
		}

		&-name {
			margin-right: auto;
			flex-grow: 1;
			display: flex;
			align-items: center;
			padding-left: 0.7rem;
		}
	}

	.delete-btn {
		margin: 0 0.7rem 0 0rem;
	}

	.add-item-form {
		display: flex;
		margin: 0.5rem;
		margin-top: 1rem;
		border: none;
		border-radius: 30px;
		background: #f3f5f5;

		&:focus-within {
			box-shadow: 0 0 0 2px lightblue;
			background: white;
		}
	}

	.add-item-input {
		flex-grow: 1;
		border-radius: 3px;
		font-size: inherit;
		line-height: 2em;
		height: 2em;
		padding-left: 0.7rem;
		border: none;
		border-radius: 30px;
		background: #f3f5f5;
		
		@supports(filter: brightness(0)){
			background: inherit;	
		}

		&:focus {
			outline: none;
		}

		&::placeholder {
			color: #4dadb9;
		}
	}
`;
