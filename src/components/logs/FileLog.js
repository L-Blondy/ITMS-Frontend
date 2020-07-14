import styled from 'styled-components';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { formatFileSize } from '#/utils';
import { BASE_URL } from '/BASE_URL';

function FileLog({ children: file, fileList, used, ...props }) {

	const { pathname } = useLocation();
	const { mimetype, originalname } = file;
	const wasDeleted = fileList.filter(fileData => fileData.name === originalname).length === 0
		|| used.filter(fileData => fileData.originalname === originalname).length > 0;
	const isImage = mimetype.indexOf('image') === 0;

	if (wasDeleted) {
		return (
			<div { ...props }>
				<span>
					{ originalname }
				</span>
				<LightFont$ as='i' className='light-font'>
					(deleted)
				</LightFont$>
			</div>
		);
	}

	used.push(file);

	if (isImage) {
		return (
			<A$ { ...props }
				href={ BASE_URL + pathname + '/' + originalname }
				target='_blank'
				rel='noopener noreferrer'>
				<img
					src={ BASE_URL + pathname + '/' + originalname }
					alt={ originalname }
				/>
			</A$>
		);
	}
	else { //is not an image && was not deleted
		return (
			<A$ { ...props }
				href={ BASE_URL + pathname + '/' + originalname }
				target='_blank'
				rel='noopener noreferrer'>
				{ originalname }
				<LightFont$ className='light-font'>
					{ formatFileSize(file.size) }
				</LightFont$>
			</A$>
		);
	}
}

export default FileLog;

const A$ = styled.a`
	color: #3582a2;
	font-weight: bold;
	text-decoration: underline;

	img {
		max-width: 100%;
		max-height: calc(20vh + 100px);
		display: block;
		margin: auto;
		box-shadow: 0 0 5px 0 #ddd;
	}
`;

const LightFont$ = styled.span`
	font-size: 0.9em;
	margin-left: 0.5rem;
`;