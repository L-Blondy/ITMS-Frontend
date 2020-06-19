import styled from 'styled-components';
import React from 'react';
import { FlexRow$ } from '../../../components/flex';

function ViewUserPage({ initialData: { user } }) {

	return (<>
		<h1>
			{ user.id }
		</h1>
		{
			Object.keys(user).map(key => (
				<FlexRow$$ key={ key + key }>
					<span className='key'>
						{ key }
					</span>
					<span className='value'>
						{ JSON.stringify(user[ key ]) }
					</span>
				</FlexRow$$>
			))
		}
	</>);

}

export default ViewUserPage;

const FlexRow$$ = styled(FlexRow$)`

	.key, 
	.value {
		min-width: 8rem;
		padding: 0.5rem;
	}
`;