import React from 'react';

function WorkLog({ children: log, ...props }) {

	return (
		<div { ...props }>
			{ log }
		</div>
	);
}

export default WorkLog;