import styled from 'styled-components';
import React from 'react';

function PromptDelete({ message, isPrompting, handlePromptAnswer }) {
	if (!isPrompting)
		return null;
	else
		return (
			<PromptDelete$>

				<h3 className='header'> Warning ! </h3>

				<div className='message'>{ message }</div>

				<button
					className='btn-contained-alert-prim yes'
					onClick={ () => handlePromptAnswer(true) }>
					Yes
				</button>

				<button
					className='btn-contained-alert-sec'
					onClick={ () => handlePromptAnswer(false) }>
					No
				</button>

			</PromptDelete$>
		);
}

export default PromptDelete;

const PromptDelete$ = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	background: white;
	z-index: 1004;
	text-align: center;
	min-width: 250px;

	.header{
		line-height: 50px;
		background: #ffba12;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.3rem;
		margin-bottom: 2rem;
	}

	.message {
		margin: 1rem;
		font-size: 1.15rem;
	}
	
	button {
		margin: 1rem 0.5rem;
		font-size: 1.05rem;
		min-width: 4em;
	}
`;
