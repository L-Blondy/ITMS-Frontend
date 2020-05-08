import React from 'react';

function ErrorPage({ error }) {
	return (
		<div>
			{ JSON.stringify(error) }
		</div>
	);
}

export default ErrorPage;
