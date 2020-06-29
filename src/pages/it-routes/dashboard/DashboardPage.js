import React, { useRef, useEffect } from 'react';
import { withInitialFetch } from '../../../higher-order';

function DashboardPage() {

	return (
		<div>
			Deeeshboard
		</div>
	);
}

export default withInitialFetch(DashboardPage);

