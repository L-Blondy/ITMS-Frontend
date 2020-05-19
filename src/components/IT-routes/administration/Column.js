import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { plus, plusRed, chevron } from '../../../assets/icons';

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
							<button
								className='item-control up'
								onClick={ () => handleUp(index) }
							/>
							<button
								className='item-control down'
								onClick={ () => handleDown(index) }
							/>
							<button
								className='item-control delete'
								onClick={ () => handleDelete(index) }
							/>
						</div>
					);
				}) }

				{ (name === 'categories' || selectedItem) && (
					<form className='add-item-form' onSubmit={ handleAdd }>
						<input
							name='add-item-input'
							id={ name }
							className='add-item-input'
							placeholder='Add item'
							autoComplete='off'
						/>
						<button className='add-item-button' />
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

		&-control {
			background-color: transparent;
			width: 25px;
			background-size: 1.2rem;
			background-repeat: no-repeat;
			background-position: center;
			opacity: 0.3;

			&:hover,
			&:focus {
				opacity: 1;
			}

			&.up {
				background-image: url(${ chevron });
			}

			&.down {
				background-image: url(${ chevron });
				transform: rotate(180deg);
			}

			&.delete {
				background-image: url(${ plusRed });
				margin: 0 0.7rem 0 0rem;
				background-size: 1.1rem;
			}
		}
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

	.add-item-button {
		color: white;
		border: none;
		border-radius: 50px;
		background: #0096ac;
		width: 32px; 
		position: relative;
		background-image: ${`url(${ plus })` };
		background-size: 1rem;
		background-repeat: no-repeat;
		background-position: center;

		&:hover,
		&:focus {
			filter: brightness(1.2);
			outline: none;
		}
	}
`;
