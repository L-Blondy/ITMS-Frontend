import styled from 'styled-components';
import React from 'react';
import { BASE_URL } from '/BASE_URL';
import { FileInfo } from '../../files';

function FileList({ when, fileList }) {
	if (!when)
		return null;

	return (
		<FileList$>
			{ fileList.map((fileData, i) => (
				<FileInfo
					tag='a'
					className='file-data'
					data={ fileData }
					href={ BASE_URL + location.pathname + '/' + fileData.name }
					target='_blank'
					rel='noopener noreferrer'
					key={ fileData.name + i }
				/>
			)) }
		</FileList$>
	);
}

export default FileList;

const FileList$ = styled.div`
	font-size: 0.9em;
	/* letter-spacing: -0.01em; */
	display: flex;
	flex-wrap: wrap;
	padding: 0.2rem;

	.file-data {
		margin-right: 0.5rem;

		&:hover {
			background: #f0f0f0;
			opacity: 1;
		}
	}
`;
