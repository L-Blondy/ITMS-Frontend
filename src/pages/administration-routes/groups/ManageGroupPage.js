import styled from 'styled-components';
import React from 'react';
import { FlexRow$ } from '../../../components/flex';

function ManageGroupPage({ initialData: { group } }) {
	console.log(group);

	// return Object.keys(initialData).map(key => (
	// 	<FlexRow$$ key={ key + key }>
	// 		<span className='key'>
	// 			{ key }
	// 		</span>
	// 		<span className='value'>
	// 			{ JSON.stringify(initialData[ key ]) }
	// 		</span>
	// 	</FlexRow$$>
	// ));
	return (
		<h1>
			ManageGroupPage
		</h1>
	);

}

export default ManageGroupPage;

const FlexRow$$ = styled(FlexRow$)`

	.key, 
	.value {
		min-width: 8rem;
		padding: 0.5rem;
	}
`;