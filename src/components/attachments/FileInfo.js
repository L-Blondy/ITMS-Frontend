import styled from 'styled-components';
import React from 'react';
import { formatFileSize } from '../../utils';
import * as SRC from '/assets/icons/fileTypes';

function FileInfo({ data, className, ...props }) {
	return (
		<FileInfo$ { ...props } className={ 'file-info ' + className } >
			<img className='icon' src={ getSRC(data) } alt='' />
			<span className='name'>{ data.name }</span>
			<span className='size light-font'>{ formatFileSize(data.size) }</span>
		</FileInfo$>
	);
}

export default FileInfo;

function getSRC(file) {
	const { mimetype, name } = file;
	if (mimetype.includes('image'))
		return SRC.image;
	if (mimetype.includes('pdf'))
		return SRC.pdf;
	if (mimetype.includes('zip') || name.endsWith('rar'))
		return SRC.archive;
	if (mimetype.includes('text'))
		return SRC.all;
}

const FileInfo$ = styled.span`
	display: flex !important;
	align-items: center;
	color: #333;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	border-radius: 5px;

	* {
		margin-right: 0.4em;
	}

	.icon {
		height: 1.1rem;
		text-align: initial;
		line-height: initial;
	}

	.name {
		flex-grow: 1;
	}

	.size {
		font-size: 0.9em;
	}
`;