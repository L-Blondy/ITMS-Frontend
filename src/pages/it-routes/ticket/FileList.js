import styled from 'styled-components';
import React from 'react';
import { FileInfo } from '../../../components/attachments';
import { BASE_URL } from '/BASE_URL';

function FileList({ fileList }) {

	return (
		<Div$>
			{ fileList.map((file, i) => (
				<FileInfo
					as='a'
					data={ file }
					href={ BASE_URL + location.pathname + '/' + file.name }
					target='_blank'
					rel='noopener noreferrer'
					key={ file.name + i }
				/>
			)) }
		</Div$>
	);
};

export default FileList;

const Div$ = styled.div`
	font-size: 0.9em;
	display: flex;
	flex-wrap: wrap;
	padding: 0.2rem;

	.file-info {
		margin-right: 0.5rem;
		
		&:hover {
			background: #f0f0f0;
			opacity: 1;
		}
	}
`;