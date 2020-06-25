import styled from 'styled-components';
import InputCommon$ from './InputCommon$';

const InputLabelTopAbs$ = styled(InputCommon$)`
	label {
		position: absolute;
		bottom: 100%;
		white-space: nowrap;
		line-height: 28px;
	}
	.errors {
		position: absolute;
		top: 100%;
	}
`;

export default InputLabelTopAbs$;