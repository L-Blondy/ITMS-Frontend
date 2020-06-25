import styled from 'styled-components';
import { CLR } from '../../GlobalStyles';

const ButtonSortBy$ = styled.button`
	text-align: left;
	background: none;
	padding: 0 0.5em;
	text-align: left;
	font-weight: 500;
	position: relative;
	display: flex;
	align-items: center;

	&.ascending,
	&.descending {
		color: ${ CLR.PRIMARY_VIBRANT };

		&::after {
			content: '';
			margin-left: 0.7em;
			height: 0;
			width: 0;
			border: 6px solid transparent;
			border-top: none;
			border-bottom: 10px solid currentColor;
		}
	}

	&.descending::after {
		transform: rotate(180deg);
	}
`;

export default ButtonSortBy$;
