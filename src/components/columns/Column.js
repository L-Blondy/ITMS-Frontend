import styled from 'styled-components';
import React, { useState } from 'react';
import { Button, ButtonItemControl$ } from '#/components/buttons';
import { FlexRow$, FlexCol$ } from '#/components/flex';
import { useArray } from '#/hooks';
import { FONT_FAM } from '#/GlobalStyles';

function Column({
	items = [],
	setItems,
	name = '"name" is required',
	handleSelect = () => { },
	selectedItems = [],
	displayAddItem = true,
	addItemRender: AddItemComponent = () => null,
	withReorder
}) {

	const { add, remove, moveUp, moveDown } = useArray(items, setItems);
	const [ addItemKey, setAddItemKey ] = useState(Math.random());

	const handleAdd = (item) => {
		console.log(item);
		add(item);
		setAddItemKey(Math.random());
	};

	return (
		<FlexCol$$>

			<span className='column-title'>{ name }</span>

			<Column$>
				{
					items.map((item, index) => (
						<FlexRow$
							className={ `item ${ item.isOneOf(selectedItems) ? 'selected' : '' }` }
							onClick={ () => handleSelect(item) }
							key={ item + index } >

							<FlexRow$ className='item-name' >
								{ item }
							</FlexRow$>

							{ withReorder && (
								<>
									<Button
										styleAs={ ButtonItemControl$.Up$ }
										onClick={ () => moveUp(index) }
									/>
									<Button
										styleAs={ ButtonItemControl$.Down$ }
										onClick={ () => moveDown(index) }
									/>
								</>
							) }
							<Button
								styleAs={ ButtonItemControl$.Delete$ }
								className='delete-btn'
								onClick={ () => remove(index) }
							/>
						</FlexRow$>
					))
				}

				<AddItemComponent
					when={ displayAddItem }
					onSubmit={ handleAdd }
					key={ addItemKey }
				/>

			</Column$>
		</FlexCol$$>
	);
}

export default Column;

const FlexCol$$ = styled(FlexCol$)`

	.column-title {
		text-transform: capitalize;
		font-size: 1.1rem;
		line-height: 2em;
	}
`;

const Column$ = styled(FlexCol$)`
	width: 270px;
	min-height: 400px;
	border-radius: 5px;
	border: 1px solid #90b7bc;
	padding-top: 0.25rem;
	flex-grow: 1;

	.item {
		align-items: stretch;
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
			align-items: center;
			padding-left: 0.7rem;
		}
	}

	.delete-btn {
		margin: 0 0.7rem 0 0rem;
	}
`;
