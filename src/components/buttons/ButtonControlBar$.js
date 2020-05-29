import styled from 'styled-components';
import ButtonCommon$ from './ButtonCommon$';

const ButtonControlBar$ = styled(ButtonCommon$)`
	padding: 0.15rem 0.8rem;
	background-color: #f4f4f4;
	border-radius: 2px;
	color: #52676a;
	font-size: 0.95em;
	box-shadow: 0 0 0 1px #acc2c4;

	&:hover{
		background-color: white;
		color: #666;
	}
`;

export default ButtonControlBar$;
