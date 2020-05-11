import styled from 'styled-components';
import React from 'react';
import preloader from '../assets/icons/preloader.svg';

function LoadingPage() {
	return (
		<FlexCenter$>
			<img src={ preloader } alt='Loading...' />
		</FlexCenter$>
	);
}

export default LoadingPage;

const FlexCenter$ = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center; 
	justify-content: center;
	background-color: rgba(0,0,0,0.2);
	img {
		margin-top: -50px;
		height: 100px;
	}
`;