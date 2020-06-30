import styled from 'styled-components';
import React from 'react';
import { preloader } from '/assets/icons';

function Preloader({ className }) {
	return (
		<Preloader$ className={ className }>
			<div className='preloader' />
		</Preloader$>
	);
}

export default Preloader;

const Preloader$ = styled.div`
	height: 100%;
	width: 100%;
	flex-grow: 1;

	&.absolute {
		position: absolute;
		z-index: 1;
	}

	.preloader {
		position: relative;
		height: 100%;
		width: 100%;
		pointer-events: none;

		&::before {
			content: "";
			position: absolute;
			top:0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0,0,0,0.25);
			z-index: 1005;
		}
		
		&::after {
			content: "";
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			height: 100px;
			width:100px;
			background-image: url(${ preloader });
			background-position: center;
			background-repeat: no-repeat;
			background-size: contain;
			z-index: 1006;
		}
	}
`;