import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { DisableBg, Warning } from './';

function Button({
	Render$ = 'button',
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

	const handleClick = () => {
		onClick && onClick();
		onConfirm && setIsWarning(true);
	};

	return (<>
		<Warning
			when={ isWarning }
			title={ warning.title }
			message={ warning.message }
			confirm={ warning.confirm }
			cancel={ warning.cancel }
			disableBg={ warning.disableBg }
			handleChoice={ handleChoice }
		/>
		<Render$
			className={ className }
			onClick={ handleClick }>
			{ children }
		</Render$>
	</>);
};

export default Button;


