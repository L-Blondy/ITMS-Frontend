import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Input from './Input';

const Textarea = React.forwardRef((props, ref) => {
	return <Input as={ TextareaAutosize } ref={ ref } { ...props } />;
});

export default Textarea;