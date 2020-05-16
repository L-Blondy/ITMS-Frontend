import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { DisableBg, Warning } from './';

function Button({
	Render$ = Button$,
	children,
	isVisible = true,
	onClick,
	onConfirm,
	warning = {},
	className
}) {
	if (!isVisible) return <div />;

	const [ isWarning, setIsWarning ] = useState(false);

	const handleChoice = (isConfirmed) => {
		setIsWarning(false);
		if (isConfirmed) {
			onConfirm();
		}
	};

	return (<>
		<DisableBg when={ isWarning } />
		<Warning
			when={ isWarning }
			title={ warning.title }
			message={ warning.message }
			confirm={ warning.confirm }
			cancel={ warning.cancel }
			handleChoice={ handleChoice }
		/>
		<Render$
			className={ className }
			onClick={ onClick || (() => setIsWarning(true)) }>
			{ children }
		</Render$>
	</>);
};

export default Button;

const Button$ = styled.button`
	margin-left: 0.5rem;
	padding: 0.15rem 0.8rem;
	background-color: #f4f4f4;
	border-radius: 2px;
	color: #295257;
	font-size: 0.95em;
	box-shadow: 0 0 0 1px #acbec0;
	font-weight: bold;

	&:hover{
		background-color: white;
		color: #666;
	}
`;
