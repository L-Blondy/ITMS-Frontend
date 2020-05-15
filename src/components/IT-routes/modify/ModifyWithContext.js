import React, { createContext, useState } from 'react';
import { ModifyPage } from './';

export const ModifyCtx = createContext();

function ModifyWithContext({ initialData }) {

	const [ state, setState ] = useState(initialData.modify);

	const modifyCtx = new modifyCtxModel(
		state, setState
	);

	return (
		<ModifyCtx.Provider value={ modifyCtx } >
			<ModifyPage />
		</ModifyCtx.Provider>
	);
}

export default ModifyWithContext;

class modifyCtxModel {

	constructor(
		state, setState
	) {
		this.state = state;
		this.setState = setState;
	}
}