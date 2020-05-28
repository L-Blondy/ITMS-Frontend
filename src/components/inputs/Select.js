import React from 'react';
import Input from './Input';

function Select(props) {
	return <Input as={ 'select' } { ...props } />;
}

export default Select;
