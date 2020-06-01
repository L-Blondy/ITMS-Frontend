import React, { useRef, useEffect } from 'react';
import Form from './Form';
import Validation from '../../utils/Validation';
import requirements from './requirements.json';

function DashboardPage() {

	const validation = new Validation(requirements);
	return (
		<div>
			<Form validation={ validation } />
		</div>
	);
}

export default DashboardPage;

