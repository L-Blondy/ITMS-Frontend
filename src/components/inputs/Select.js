import React from 'react';
import Input from './Input';

const Select = React.forwardRef((props, ref) => {
	return <Input
		as={ 'select' }
		ref={ ref }
		{ ...props }
	/>;
});

export default Select;
