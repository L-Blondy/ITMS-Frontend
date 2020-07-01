import React, { forwardRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Input from './Input';

const Textarea = (props, ref) => {
	return <Input as={ TextareaAutosize } ref={ ref } { ...props } />;
};

export default forwardRef(Textarea);