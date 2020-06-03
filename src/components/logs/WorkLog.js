import React from 'react';

function WorkLog({ children: log, when, ...props }) {
	if (!when) return null;

	return (
		<div { ...props }>
			{ log }
		</div>
	);
}

export default WorkLog;