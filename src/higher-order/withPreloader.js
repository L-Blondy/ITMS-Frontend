import React, { useState, useEffect } from 'react';
import { Preloader } from '#/components/preloader';

function withPreloader(Target) {

	return function V(props) {

		const [ isLoading, setIsLoading ] = useState(false);

		useEffect(() => console.log('MOUNT PRELOADER'), []);

		return (
			<Target
				{ ...props }
				setIsLoading={ setIsLoading }
				isLoading={ isLoading }
				Preloader={ isLoading ? (props) => <Preloader { ...props } className='absolute' /> : 'div' }
			/>
		);
	};
}

export default withPreloader;
