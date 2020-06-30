import React, { useRef, useEffect } from 'react';
import { withInitialFetch } from '../../../higher-order';
import { ItPageContainer$$ } from '../../../components/containers';

function DashboardPage() {

	return (
		<ItPageContainer$$>
			Deeeshboard
		</ItPageContainer$$>
	);
}

export default withInitialFetch(DashboardPage);

