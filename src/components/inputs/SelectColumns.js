import styled from 'styled-components';
import React, { useState } from 'react';
import { FlexRow$, FlexCol$ } from '../flex';
import { Button, ButtonCommon$ } from '../buttons';


function SelectColumns({
	styleAs = 'div',
	minHeight = 'auto',
	columnWidth = 'auto',
	nameColumn1 = '',
	nameColumn2 = '',
	options = []
}) {

	const [ selected, setSelected ] = useState([]);

	const handleEvent = (e) => {
		const isDownArrow = e.keyCode === 40;
		const isUpArrow = e.keyCode === 38;
		const isEnterKey = e.keyCode === 13;
		const isClick = e.type === 'click';

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

			if ((!e.shiftKey && !e.ctrlKey) || (e.shiftKey && !selected.length))
				return setSelected([ value ]);

			if (e.ctrlKey) {
				return setSelected([ ...selected, value ]);
			}

			let sliceIndexes = [ options.indexOf(value), options.indexOf(selected[ 0 ]) ].sort();
			sliceIndexes[ 1 ]++;
			setSelected(options.slice(...sliceIndexes));
		}
	};

	return (
		<FlexRow$$
			as={ styleAs }
			className='select-multiple'
			minHeight$={ minHeight }
			columnWidth$={ columnWidth }>

			<FlexCol$ className='select-column-wrapper'>
				<div className='label'>
					{ nameColumn1 }
				</div>
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
			</FlexCol$>

			<FlexCol$>
				FlexCol2
			</FlexCol$>

			<FlexCol$ className='select-column-wrapper'>
				<div className='label'>
					{ nameColumn2 }
				</div>
				<FlexCol$ className='select-column'>
					FlexCol2
				</FlexCol$>
			</FlexCol$>

		</FlexRow$$>
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