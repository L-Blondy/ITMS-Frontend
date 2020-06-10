import React from 'react';
import styled from 'styled-components';

function Settings ( { when = false, close } ) {

	if ( !when ) return null

	return (
		<Settings$>
			<div className="header">
				<div>Settings</div>
				<button className='close' onClick={ close }>X</button>
			</div>

			<div className='main'>
				Some settings here
			</div>
		</Settings$>
	);
}

export default Settings;

const Settings$ = styled.div`
	background: #eee;
	position: absolute;
	top:50%;
	left: 50%;
	transform: translate(-50%,-50%);
	min-width: 400px;
	min-height: 300px;
	padding: 0.5rem 1rem;
	z-index: 1000;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.3rem;
		margin-bottom: 0.3rem;
	}

	.close {
		font-size: 1.5rem;
		padding: 0;
		margin: 0;
		border: none;
		background: none;
	}
`;