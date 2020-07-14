import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { FlexRow$, FlexCol$ } from '#/components/flex';
import { Button, ButtonCommon$ } from '#/components/buttons';
import { CLR } from '#/GlobalStyles';
import { chevron3 } from '/assets/icons';

function SelectColumns({
	styleAs = 'div',
	minHeight = 'auto',
	columnWidth = 'auto',
	columnNameLeft = '',
	columnNameRight = '',
	options = [],
	defaultValues = []
}) {

	useEffect(() => {
		if (!defaultValues.every(val => options.indexOf(val) !== -1))
			throw new Error('"defaultValues" has to be a subArray of "options"');
	}, []);

	const [ leftValues, setLeftValues ] = useState(options.filter(opt => !opt.isOneOf(defaultValues)));
	const [ rightValues, setRightValues ] = useState(defaultValues);
	const [ hightlighted, setHightlighted ] = useState({ side: '', values: [] });

	const handleEvent = useHandleClick(setHightlighted, hightlighted, leftValues, rightValues);


	const handleAdd = () => {
		if (hightlighted.side !== 'left') return;

		const nextLeftValues = leftValues.filter(value => !value.isOneOf(hightlighted.values));
		const nextRightValues = [ ...rightValues, ...hightlighted.values ];

		setLeftValues(nextLeftValues);
		setRightValues(nextRightValues);
		setHightlighted({
			side: 'right',
			values: hightlighted.values
		});
	};

	const handleRemove = () => {
		if (hightlighted.side !== 'right') return;

		const nextRightValues = rightValues.filter(value => !value.isOneOf(hightlighted.values));
		const nextLeftValues = [ ...leftValues, ...hightlighted.values ];

		setRightValues(nextRightValues);
		setLeftValues(nextLeftValues);
		setHightlighted({
			side: 'left',
			values: hightlighted.values
		});
	};

	const hightlightOrNot = (side, value) => {
		if (side === hightlighted.side && value.isOneOf(hightlighted.values))
			return 'hightlighted';
	};

	return (
		<FlexRow$$
			as={ styleAs }
			className='select-multiple'
			minHeight$={ minHeight }
			columnWidth$={ columnWidth }>

			<FlexCol$ className='select-column-wrapper'>
				<div className='label'>
					{ columnNameLeft }
				</div>
				<FlexCol$ className='select-column' onClick={ handleEvent } onKeyDown={ handleEvent } data-side='left'>
					{ leftValues.map(value => (
						<div
							className={ `option ${ hightlightOrNot('left', value) }` }
							tabIndex={ 0 }
							key={ value }
							data-value={ value } >
							{ value }
						</div>
					)) }
				</FlexCol$>
			</FlexCol$>

			<FlexCol$ className='select-controls'>
				<Button
					styleAs={ AddBtn$ }
					type='button'
					onClick={ handleAdd }
					disabled={ hightlighted.side !== 'left' }>
					<img src={ chevron3 } alt='add' />
				</Button>

				<Button
					styleAs={ RemoveBtn$ }
					type='button'
					onClick={ handleRemove }
					disabled={ hightlighted.side !== 'right' }>
					<img src={ chevron3 } alt='remove' />
				</Button>
			</FlexCol$>

			<FlexCol$ className='select-column-wrapper'>
				<div className='label'>
					{ columnNameRight }
				</div>
				<FlexCol$ className='select-column' onClick={ handleEvent } onKeyDown={ handleEvent } data-side='right'>
					{ rightValues.map(value => (
						<div
							className={ `option ${ hightlightOrNot('right', value) }` }
							tabIndex={ 0 }
							key={ value }
							data-value={ value } >
							{ value }
						</div>
					)) }
				</FlexCol$>
			</FlexCol$>

		</FlexRow$$>
	);
}

export default SelectColumns;

const useHandleClick = (setHightlighted, hightlighted, leftValues, rightValues) => {

	const handleArrowEvent = (keyCode) => {
		if (keyCode === 40) {
			if (!document.activeElement.nextElementSibling)
				return document.activeElement.parentElement.firstChild.focus();
			else
				return document.activeElement.nextElementSibling.focus();
		}

		if (keyCode === 38) {
			if (!document.activeElement.previousElementSibling)
				return document.activeElement.parentElement.lastChild.focus();
			else
				return document.activeElement.previousElementSibling.focus();
		}
	};

	const handleEvent = (e) => {
		const currentSide = e.currentTarget.dataset.side;
		const isSameSide = currentSide === hightlighted.side;
		const isDownArrow = e.keyCode === 40;
		const isUpArrow = e.keyCode === 38;
		const isEnterKey = e.keyCode === 13;
		const isClick = e.type === 'click';
		const isNotRelevantKey = !isDownArrow && !isUpArrow && !isEnterKey && !isClick;

		if (isNotRelevantKey) {
			return;
		}

		if (isDownArrow || isUpArrow)
			return handleArrowEvent(e.keyCode);

		if (isEnterKey || isClick) {
			const value = document.activeElement.dataset.value;


			if (!isSameSide || (!e.shiftKey && !e.ctrlKey) || (e.shiftKey && !hightlighted.values.length)) {
				return setHightlighted({
					side: currentSide,
					values: [ value ]
				});
			}

			if (e.ctrlKey) {
				return setHightlighted({
					side: currentSide,
					values: [ ...hightlighted.values, value ]
				});
			}
			//shiftKey
			const values = currentSide === 'left' ? [ ...leftValues ] : [ ...rightValues ];
			let sliceIndexes = [ values.indexOf(value), values.indexOf(hightlighted.values[ 0 ]) ].sort(); /// <= do not use OPTION but LEFT-OPTION or RIGHT-OPTIONS
			sliceIndexes[ 1 ]++;
			setHightlighted({
				side: currentSide,
				values: values.slice(...sliceIndexes)
			});
		}
	};

	return handleEvent;
};

const FlexRow$$ = styled(FlexRow$)`
	min-height: ${ props => props.minHeight$ } !important;

	.label {
		line-height: 1.7em;
	}

	.select-column {
		width: ${ props => props.columnWidth$ } !important;
		flex-grow: 1;

		.option {
			width: 100%;
		}
	}

	.select-controls {
		justify-content: center;
	}
`;

const ControlButton$ = styled(ButtonCommon$)`
	height: 1.5rem;
	width: 1.5rem;
	padding: 0;
	margin: 0.2rem 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 3px;
	background: ${ CLR.PRIMARY };

	img {
		height: 48%;
		padding-bottom: 1px;
	}
`;

const AddBtn$ = styled(ControlButton$)`
	transform: rotate(90deg);
`;

const RemoveBtn$ = styled(ControlButton$)`
	transform: rotate(-90deg);
`;

