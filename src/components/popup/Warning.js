import styled from 'styled-components';
import React from 'react';
import { DisableBg } from './';
import { Button, ButtonAlert$ } from '../buttons';

function Warning({
	title = 'Warning !',
	message = 'Are you sure ?',
	confirm = 'Yes',
	cancel = 'No',
	handleChoice,
	when,
	disableBg = true
}) {

	if (!when)
		return null;

	else
		return (<>
			<DisableBg when={ when && disableBg } />

			<Warning$>

				<h3 className='warning-header'> { title } </h3>

				<div className='warning-message'>{ message }</div>

				<Button
					styleAs={ ButtonAlert$.Primary$ }
					onClick={ () => handleChoice(true) }>
					{ confirm }
				</Button>

				<Button
					styleAs={ ButtonAlert$.Secondary$ }
					onClick={ () => handleChoice(false) }>
					{ cancel }
				</Button>

			</Warning$>
		</>);
}

export default Warning;

const Warning$ = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	background: white;
	z-index: 1004;
	text-align: center;
	min-width: 250px;

	.warning-header{
		line-height: 50px;
		background: #ffba12;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.3rem;
		margin-bottom: 2rem;
	}

	.warning-message {
		margin: 1rem;
		font-size: 1.15rem;
	}
	
	button {
		margin: 1rem 0.4rem;
		margin-bottom: 1.5rem;
		font-size: 1.05rem;
		min-width: 4em;
	}
`;
