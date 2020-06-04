import styled from 'styled-components';

const FlexRow$ = styled.div`
	display: flex;
	flex-shrink: 0;
	max-width: 100%;
	max-height: 100%;

	&.xs-1 {
		flex-basis: calc(100% / 12);
	}

	&.xs-12 {
		flex-basis: 100%;
	}

	&.sm-6 {
		@media (min-width: 768px) {
			flex-basis: 50%;
		}
	}
`;

export default FlexRow$;