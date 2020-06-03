import React, { useRef, useEffect } from 'react';
import Form from './Form';
import Validation from '../../utils/Validation';
import requirements from './requirements.json';

function DashboardPage() {

	const form = useRef();

	const validation = new Validation(form, requirements);
	return (
		<div>
			<Form ref={ form } validation={ validation } />
		</div>
	);
}

export default DashboardPage;

