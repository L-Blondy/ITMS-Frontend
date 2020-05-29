import styled from 'styled-components';
import InputCommon$ from './InputCommon$';
import { CLR } from '../../GlobalStyles';

const InputAbsolute$ = styled(InputCommon$)`

	span {
		position: absolute;
		right: calc(100% + 1.5rem);
		white-space: nowrap;
	}
`;

export default InputAbsolute$;