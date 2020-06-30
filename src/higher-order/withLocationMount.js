import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function withLocationMount(Target) {

	return function (props) {
		const location = useLocation();
		const [ key, setKey ] = useState(Math.random());

		useEffect(() => {
			setKey(Math.random());
		}, [ location ]);

		return (
			<Target
				{ ...props }
				key={ key }
			/>
		);
	};
}

export default withLocationMount;