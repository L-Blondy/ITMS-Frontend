import styled from 'styled-components';
import Col12$ from './Col12$';

const Col12md6$ = styled(Col12$)`
	flex-basis: 100%;

	@media(min-width: 768px) {
		flex-basis: 50%;
	}
`;

export default Col12md6$;