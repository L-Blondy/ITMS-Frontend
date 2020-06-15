import styled from 'styled-components';
import InputCommon$ from './InputCommon$';

const InputLabelLeftAbs$ = styled(InputCommon$)`
	label {
		position: absolute;
		right: calc(100% + 1.5rem);
		white-space: nowrap;
		line-height: 1.5em;
	}
`;

export default InputLabelLeftAbs$;