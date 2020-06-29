import styled from 'styled-components';
import React from 'react';
import { FlexRow$ } from '../../../components/flex';
import { withInitialFetch } from '../../../higher-order';

function ViewGroupPage({ initialData: { group } }) {
	console.log(group);

	return (
		<>
			<h1>
				ManageGroupPage
			</h1>

			{ Object.keys(group).map(key => (
				<FlexRow$$ key={ key + key }>
					<span className='key'>
						{ key }
					</span>
					<span className='value'>
						{ JSON.stringify(group[ key ]) }
					</span>
				</FlexRow$$>
			)) }
		</>
	);
}

export default withInitialFetch(ViewGroupPage);

const FlexRow$$ = styled(FlexRow$)`

	.key, 
	.value {
		min-width: 8rem;
		padding: 0.5rem;
	}
`;