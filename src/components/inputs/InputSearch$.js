import styled from 'styled-components';
import InputCommon$ from './InputCommon$';
import { CLR } from '../../GlobalStyles';

const Search$ = styled(InputCommon$)`
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

export default Search$;