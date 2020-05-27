import styled from 'styled-components';
import React from 'react';
import { Input } from '../..';
import { CLR } from '../../../GlobalStyles';

function SearchInput({ propName }) {

	return (
		<Label$ className='column-search-label' htmlFor={ propName } >
			<Input
				className='column-search-input'
				type='text'
				name={ propName }
				placeholder='Search'
				size='4'
				id={ propName }
				autoComplete='off'
			/>
		</Label$>
	);
}

export default SearchInput;

const Label$ = styled.label`
	padding: 0.5em;
	background:  ${ CLR.BACKGROUND.LIGHT };
	border-right: 1px solid #e5e5e5;

	input {
		width: 100%;
		line-height: 1.5em;
		min-height: 1.5em;
		padding: 0 0.35em;
		border: none;
		border-radius: 3px;
	}
`;