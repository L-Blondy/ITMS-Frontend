import styled from 'styled-components';
import React, { useState } from 'react';
import { Preloader } from '../components/preloader';

function withPreloader(Target) {

	return function (props) {

		const [ isLoading, setIsLoading ] = useState(false);

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