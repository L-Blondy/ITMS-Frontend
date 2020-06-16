import styled from 'styled-components';
import React from 'react';
import { FlexRow$, FlexCol$ } from '../../components/flex';
import { Form } from './';

function LoginPage() {
	return (
		<FlexRow$$>
			<FlexCol$ className='sm-6 left'>
				Left
			</FlexCol$>
			<FlexCol$ className='sm-6 right'>
				<Form />
			</FlexCol$>
		</FlexRow$$>
	);
}

export default LoginPage;

const FlexRow$$ = styled(FlexRow$)`
	height: 100%;
	
	.left {
		background: #d5e1e4;
	}

	.right {
		align-items: center;
		justify-content: center;
	}
`;
