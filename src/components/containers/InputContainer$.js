import styled from 'styled-components';
import { FlexCol$ } from '../flex';

const InputContainer$ = styled(FlexCol$)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	&:nth-child(even){
		align-items: flex-end;
	}

	> * {
		margin-top: 1rem;
		margin-bottom: 0.3rem;
		width: 250px;
	}
`;

export default InputContainer$;