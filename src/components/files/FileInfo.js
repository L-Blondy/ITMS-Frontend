import styled from 'styled-components';
import React from 'react';
import { formatFileSize } from '../../utils';
import * as SRC from '/assets/icons/fileTypes';

function FileInfo ( { data, tag = 'span', className, ...props } ) {
	return (
		<FileInfo$
			as={ tag }
			{ ...props }
			className={ 'file-data ' + className } >
			<img className='icon' src={ getSRC( data ) } alt='' />
			<span className='name'>{ data.name }</span>
			<span className='size light-font'>{ formatFileSize( data.size ) }</span>
		</FileInfo$>
	);
}

export default FileInfo;

function getSRC ( file ) {
	const { mimetype, name } = file;
	if ( mimetype.includes( 'image' ) )
		return SRC.image;
	if ( mimetype.includes( 'pdf' ) )
		return SRC.pdf;
	if ( mimetype.includes( 'zip' ) || name.endsWith( 'rar' ) )
		return SRC.archive;
	if ( mimetype.includes( 'text' ) )
		return SRC.all;
}

const FileInfo$ = styled.span`
	display: flex;
	align-items: center;
	color: #333;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	border-radius: 5px;

	* {
		margin-right: 0.35em;
	}

	.icon {
		height: 1rem;
	}

	.name {
		flex-grow: 1;
	}

	.size {
		font-size: 0.9em;
	}
`;
