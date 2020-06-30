import styled from 'styled-components';
import React, { useState } from 'react';
import { FlexRow$, FlexCol$ } from '../flex';
import { Button, ButtonCommon$ } from '../buttons';
import { CLR } from '../../GlobalStyles';
import { chevron3 } from '/assets/icons';

function SelectColumns({
	styleAs = 'div',
	minHeight = 'auto',
	columnWidth = 'auto',
	columnNameLeft = '',
	columnNameRight = '',
	options = []
}) {

	const [ leftOptions, setLeftOptions ] = useState(options);
	const [ rightOptions, setRightOptions ] = useState([]);
	const [ selected, setSelected ] = useState([]);

	const handleEvent = (e) => {
		const isDownArrow = e.keyCode === 40;
		const isUpArrow = e.keyCode === 38;
		const isEnterKey = e.keyCode === 13;
		const isClick = e.type === 'click';
		console.log(selected);

		if (!isDownArrow && !isUpArrow && !isEnterKey && !isClick) {
			return;
		}

		if (isDownArrow) {
			if (!document.activeElement.nextElementSibling)
				return document.activeElement.parentElement.firstChild.focus();
			else
				return document.activeElement.nextElementSibling.focus();
		}
		if (isUpArrow) {
			if (!document.activeElement.previousElementSibling)
				return document.activeElement.parentElement.lastChild.focus();
			else
				return document.activeElement.previousElementSibling.focus();
		}
		if (isEnterKey || isClick) {
			const value = document.activeElement.dataset.value;

			if (selected.length && !AreSiblings(document.querySelector(`[data-value="${ selected[ 0 ] }"`), e.target)) {
				return setSelected([ value ]);
			}
			if ((!e.shiftKey && !e.ctrlKey) || (e.shiftKey && !selected.length))
				return setSelected([ value ]);

			if (e.ctrlKey) {
				return setSelected([ ...selected, value ]);
			}

			let sliceIndexes = [ options.indexOf(value), options.indexOf(selected[ 0 ]) ].sort(); /// <= do not use OPTION but LEFT-OPTION or RIGHT-OPTIONS
			sliceIndexes[ 1 ]++;
			setSelected(options.slice(...sliceIndexes));
		}
	};

	const handleAdd = () => {
		const isLeftSelected = new Set([ ...selected, ...leftOptions ]).size === leftOptions.length;
		if (!isLeftSelected) return;

		setRightOptions([ ...rightOptions, ...selected ]);
		setLeftOptions(leftOptions.reduce((next, opt) => {
			if (opt.isOneOf(selected))
				return next;
			return [ ...next, opt ];
		}, []));
	};

	return (
		<FlexRow$$
			as={ styleAs }
			className='select-multiple'
			minHeight$={ minHeight }
			columnWidth$={ columnWidth }>

			<FlexCol$ className='select-column-wrapper'>
				<div className='label'> { columnNameLeft } </div>
				<Column options={ leftOptions } handleEvent={ handleEvent } selected={ selected } />
			</FlexCol$>

			<FlexCol$>
				<Button
					styleAs={ AddBtn$ }
					type='button'
					onClick={ handleAdd }>
					<img src={ chevron3 } alt='add' />
				</Button>

				<Button
					styleAs={ RemoveBtn$ }
					type='button'
					disabled>
					<img src={ chevron3 } alt='remove' />
				</Button>
			</FlexCol$>

			<FlexCol$ className='select-column-wrapper'>
				<div className='label'> { columnNameRight } </div>
				<Column options={ rightOptions } handleEvent={ handleEvent } selected={ selected } />
			</FlexCol$>

		</FlexRow$$>
	);
};

function Column({ options, handleEvent, selected }) {

	return (
		<FlexCol$ className='select-column' onClick={ handleEvent } onKeyDown={ handleEvent }>
			{ options.map(opt => (
				<div
					className={ `option ${ opt.isOneOf(selected) ? 'selected' : '' }` }
					tabIndex={ 0 }
					key={ opt }
					data-value={ opt } >
					{ opt }
				</div>
			)) }
		</FlexCol$>
	);
}

export default SelectColumns;

const FlexRow$$ = styled(FlexRow$)`
	min-height: ${ props => props.minHeight$ } !important;

	.select-column {
		width: ${ props => props.columnWidth$ } !important;
		flex-grow: 1;
	}

	.select-column-name {

	}
`;

const ControlButton$ = styled(ButtonCommon$)`
	height: 1.5rem;
	width: 1.5rem;
	padding: 0;
	margin: 0.2rem 0.7rem;
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

function AreSiblings(elm1, elm2) {
	return elm1 != elm2 && [ ...elm1.parentNode.children ].some(child => child == elm2);
}