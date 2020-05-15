import styled from 'styled-components';
import React from 'react';
import { formatFileSize, getAttachmentIconSRC } from '../../../utils';
import { BASE_URL } from '../../../../BASE_URL';

function FileList({ when, fileList }) {
	if (!when)
		return null;

	return (
		<FileList$>
			{ fileList.map(fileData => (
				<a className='file'
					key={ fileData.name + fileData.size }
					href={ BASE_URL + location.pathname + '/' + fileData.name }
					target='_blank'
					rel='noopener noreferrer' >

					<img className='icon' src={ getAttachmentIconSRC(fileData) } alt='' />
					<span className='name'>{ fileData.name }</span>
					<span className='size light-font'>{ formatFileSize(fileData.size) }</span>
				</a>
			)) }
		</FileList$>
	);
}

export default FileList;

const FileList$ = styled.div`
	font-size: 0.9em;
	letter-spacing: -0.01em;
	display: flex;
	flex-wrap: wrap;
	padding: 0.2rem;

	.file {
		display: flex;
		align-items: center;
		color: #333;
		margin-right: 0.7rem;
		padding-left: 0.5rem;
		padding-right: 0.2rem;
		border-radius: 5px;

		* {
			margin-right: 0.35em;
		}

		&:hover {
			background: #f0f0f0;
			opacity: 1;
		}
	}

	.icon {
		height: 1rem;
	}

	.size: {
		font-size: 0.8em;
	}
`;
