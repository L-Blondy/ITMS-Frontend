import styled from 'styled-components';
import { FlexCol$ } from '../flex';

const PageContainer$ = styled(FlexCol$)`
	flex-grow: 1;
	height: 100%;
	max-width: calc(100% - 200px);
`;

export default PageContainer$;