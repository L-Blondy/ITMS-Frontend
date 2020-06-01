import styled from 'styled-components';
import InputLabelLeft$ from './InputLabelLeft$';

const InputLabelRight$ = styled( InputLabelLeft$ )`
	flex-direction: row-reverse;
	justify-content: flex-end;
`;

export default InputLabelRight$;
