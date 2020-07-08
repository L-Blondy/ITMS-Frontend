import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function withLocationMount(Target) {

	return function U(props) {
		const location = useLocation();
		const [ key, setKey ] = useState(Math.random());
		const isFirstMount = useRef(true);

		useEffect(() => {
			if (isFirstMount.current) {
				isFirstMount.current = false;
				return;
			}
			setKey(Math.random());
		}, [ location ]);

		useEffect(() => console.log('MOUNT LOCATION REMOUNT'), []);

		return (
			<Target
				{ ...props }
				key={ key }
			/>
		);
	};
}

export default withLocationMount;