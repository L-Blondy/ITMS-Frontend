import React, { useState, useRef, useEffect } from 'react';
import { Warning } from '../';

function Button({
	styleAs: Button$ = 'button',
	type = 'button',
	isVisible = true,
	onClick,
	onConfirm,
	warning = {},
	className,
	tag: Tag = 'button',
	...props
}) {
	if (!isVisible) return <div />;

	const [ isWarning, setIsWarning ] = useState(false);
	const event = useRef();

	const handleChoice = (isConfirmed) => {
		setIsWarning(false);
		if (isConfirmed) {
			onConfirm(event.current);
		}
	};

	const handleClick = (e) => {
		if (onClick) {
			onClick(e);
		}
		if (onConfirm) {
			e.persist();
			event.current = e;
			setIsWarning(true);
		}
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
		<Button$
			as={ Tag }
			className={ className }
			onClick={ handleClick }
			{ ...props }
		/>
	</>);
};

export default Button;
