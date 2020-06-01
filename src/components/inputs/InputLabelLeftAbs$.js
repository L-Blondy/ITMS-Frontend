import styled from 'styled-components';
import InputCommon$ from './InputCommon$';

const InputLabelLeftAbs$ = styled( InputCommon$ )`
	label {
		position: absolute;
		right: calc(100% + 1.5rem);
		white-space: nowrap;
	}
`;

export default InputLabelLeftAbs$;