import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { FlexRow$, FlexCol$ } from '../../../components/flex';
import { withInitialFetch } from '../../../higher-order';

function GroupsPage({ initialData: { groups } }) {

	return (<>
		<h1>
			Groups
		</h1>
		<h1>
			-
		</h1>

		<a href={ `${ location.pathname }/new` }>
			Create new Group
		</a>
		<h1>
			-
		</h1>

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
	</>);
}

export default withInitialFetch(GroupsPage);

const FlexCol$$ = styled(FlexCol$)`
	a {
		text-decoration: underline;
	}
`;
