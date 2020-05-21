import React, { createContext } from 'react';

export const UserCtx = createContext();

const user = {
	name: 'Guest user',
	timezone: 'some timezone here',
	searchLimit: 10,
	incidentSearchProps: [
		'id',
		'status',
		'priority',
		'createdOn',
		'updatedOn',
		'description',
		'instructions',
		'escalation',
		'category',
		'subCategory',
		'assignmentGroup',
		'assignedTo',
		'__v'
	],
};

function GlobalContext({ children }) {
	return (
		<UserCtx.Provider value={ user }>
			{ children }
		</UserCtx.Provider>
	);
}

export default GlobalContext;
