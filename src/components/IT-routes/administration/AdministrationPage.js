import React, { useEffect, useState } from 'react';
import { Categories } from '.';

function AdministrationPage({ initialData }) {

	const [ state, setState ] = useState(initialData.administrationData);

	return (<>
		<Categories
			categories={ state }
		/>
	</>);
}

export default AdministrationPage;
