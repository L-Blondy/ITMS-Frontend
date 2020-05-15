import React, { useContext, useEffect } from 'react';
import { ModifyCtx } from './ModifyWithContext';
import { Categories } from './';

function ModifyPage() {

	const modifyCtx = useContext(ModifyCtx);

	return (<>
		<Categories
			categories={ modifyCtx.state }
		/>
	</>);
}

export default ModifyPage;
