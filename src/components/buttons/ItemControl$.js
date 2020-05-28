import styled from 'styled-components';
import { chevron, plusRed, plus } from '/assets/icons';

const ItemControl$ = styled.button`
	background-color: transparent;
	width: 25px;
	background-size: 1.2rem;
	background-repeat: no-repeat;
	background-position: center;
	opacity: 0.3;
	&:hover,
	&:focus {
		opacity: 1;
	}
`;

const Up$ = styled(ItemControl$)`
	background-image: url(${ chevron });
`;

const Down$ = styled(ItemControl$)`
	background-image: url(${ chevron });
	transform: rotate(180deg);
`;
const Delete$ = styled(ItemControl$)`
	background-image: url(${ plusRed });
	background-size: 1.1rem;
`;

const Add$ = styled.button`
	color: white;
	border: none;
	border-radius: 50px;
	background: #0096ac;
	width: 32px; 
	position: relative;
	background-image: ${`url(${ plus })` };
	background-size: 1rem;
	background-repeat: no-repeat;
	background-position: center;

	&:hover,
	&:focus {
		filter: brightness(1.2);
		outline: none;
	}
`;

export default { Up$, Down$, Delete$, Add$ };
