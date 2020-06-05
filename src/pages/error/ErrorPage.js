import React from 'react';

function ErrorPage({ error }) {
	return (
		<div>
			ERROR
			{ JSON.stringify(error) }
		</div>
	);
}

export default ErrorPage;
