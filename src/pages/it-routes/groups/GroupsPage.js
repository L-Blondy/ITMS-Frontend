import styled from 'styled-components';
import React from 'react';
import { FlexRow$, FlexCol$ } from '../../../components/flex';

function GroupsPage({ initialData: { groups } }) {

	return (
		<FlexCol$$>
			{ groups && groups.map(group => (
				<FlexRow$ key={ group.name }>
					<a href={ `${ location.pathname }/${ group.name }` }>
						{ group.name }
					</a>
					<FlexRow$>
						{ group.users.map(user => (
							<FlexRow$>{ user.name }</FlexRow$>
						)) }
					</FlexRow$>
				</FlexRow$>
			)) }
		</FlexCol$$>
	);
}

export default GroupsPage;

const FlexCol$$ = styled(FlexCol$)`

	a {
		text-decoration: underline;
	}
`;
