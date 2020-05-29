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
	tag: Tag = 'button',
	...props
}) {
	if (!isVisible) return <div />;

	const [ isWarning, setIsWarning ] = useState(false);

	const handleChoice = (isConfirmed) => {
		setIsWarning(false);
		if (isConfirmed) {
			onConfirm();
		}
	};

	const handleClick = (e) => {
		onClick && onClick(e);
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
			type='button'
			className={ className }
			onClick={ handleClick }
			{ ...props }>
			{ children }
		</StyleAs>
	</>);
};

export default Button;