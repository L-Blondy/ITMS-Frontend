import React, { useState } from 'react';
import { Warning } from '../';

function Button({
	styleAs: StyleAs = 'button',
	children,
	isVisible = true,
	onClick,
	onConfirm,
	warning = {},
	className,
	tag: Tag = 'button'
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
		<StyleAs
			as={ Tag }
			className={ className }
			onClick={ handleClick }>
			{ children }
		</StyleAs>
	</>);
};

export default Button;
