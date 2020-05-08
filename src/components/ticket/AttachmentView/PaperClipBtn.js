import React from 'react';
import styled from 'styled-components';
import * as SRC from '../../../assets/icons';

const PaperClipBtn = ({ onClick }) => <Button$ onClick={ onClick } />;

export default PaperClipBtn;

const Button$ = styled.button`
	width: 2.2rem;
	background-image: ${ `url(${ SRC.paperclip })` };
	background-repeat: no-repeat;
	background-position: center;
	background-size: 25px;
`;
