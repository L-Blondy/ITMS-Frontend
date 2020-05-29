import styled from 'styled-components';
import React from 'react';
import { formatFileSize, getAttachmentIconSRC } from '../../utils';

function FileData({ data, tag = 'span', className, ...props }) {
	return (
		<FileData$
			as={ tag }
			{ ...props }
			className={ 'file-data ' + className } >
			<img className='icon' src={ getAttachmentIconSRC(data) } alt='' />
			<span className='name'>{ data.name }</span>
			<span className='size light-font'>{ formatFileSize(data.size) }</span>
		</FileData$>
	);
}

export default FileData;

const FileData$ = styled.span`
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
