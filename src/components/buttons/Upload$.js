import styled from 'styled-components';
import Primary$ from './Primary$';
import { upload } from '/assets/icons';

const Upload$ = styled(Primary$)`
	background-image: ${ `url(${ upload })` };
	background-repeat: no-repeat;
	background-position: center;
	background-size: 1.3rem;
	width: 40px;
	color: transparent;

	
	@supports(filter: grayscale(1) brightness(1.4)){
		&.disabled {
			opacity: 1;
			filter: grayscale(1) brightness(1.45);
		}
	}

	&.enabled {
		background-color: #00c4ff;
		border-color: #00c4ff;
		outline: 1px solid #00c4ff;
	}
`;

export default Upload$;
