import styled from 'styled-components';
import InputCommon$ from './InputCommon$';

const InputLabelLeftAbs$ = styled(InputCommon$)`
	label,.label {
		position: absolute;
		right: calc(100% + 1.5rem);
		white-space: nowrap;
		line-height: 28px;
	}
	.errors {
		position: absolute;
		top: 100%;
	}
`;

export default InputLabelLeftAbs$;