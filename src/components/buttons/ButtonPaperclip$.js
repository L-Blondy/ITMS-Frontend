import styled from 'styled-components';
import ButtonCommon$ from './ButtonCommon$';
import { paperclip } from '/assets/icons';

const ButtonPaperclip$ = styled(ButtonCommon$)`
	width: 2.2rem;
	background-image: ${ `url(${ paperclip })` };
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	background-color: transparent;
	height: 100%;
	/* padding: 0 1.5rem; */
	width: 3rem;
	box-shadow: none;
	
	&:hover {
		filter: blur(0.5px);
		opacity: 0.65;
	}
`;

export default ButtonPaperclip$;
