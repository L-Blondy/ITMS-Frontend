import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Input from './Input';

function Textarea ( props ) {
	return <Input as={ TextareaAutosize } { ...props } />;
}

export default Textarea;