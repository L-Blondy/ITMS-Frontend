import styled from 'styled-components';
import React from 'react';
import { FlexRow$, FlexCol$ } from '../../../components/flex';

function AllGroupsPage({ initialData: { groups } }) {

	return (
		<div>
			{ groups && groups.map(group => (
				<FlexCol$ key={ group.name }>
					<FlexRow$ as='h3'>
						{ group.name }
					</FlexRow$>
					<FlexRow$>
						{ group.users.map(user => (
							<FlexRow$>{ user.name }</FlexRow$>
						)) }
					</FlexRow$>
				</FlexCol$>
			)) }
		</div>
	);
}

export default AllGroupsPage;
