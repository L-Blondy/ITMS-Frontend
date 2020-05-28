import styled from 'styled-components';
import Common$ from './Common$';
import { close } from '/assets/icons';

const Close$ = styled(Common$)`
	background: none;
	box-shadow: none;
	color: white;
	cursor: pointer;
	width: 20px;
	background-image: ${ `url(${ close })` };
	background-repeat: no-repeat;
	background-position: center;
	background-size: 20px;
	position: relative;
	width: 40px;
	height: 40px;
	padding: 0;

	&:hover {
		opacity: 0.7;
	}
`;

export default Close$;