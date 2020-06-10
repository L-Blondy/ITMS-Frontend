import styled from 'styled-components';
import React from 'react';
import { AttachmentInfo } from './';
import { Input, InputLabelRight$ } from '../inputs';
import { BASE_URL } from '/BASE_URL';
import { CLR } from '../../GlobalStyles';

const FileList = React.forwardRef(({ fileList = [], className, ...props }, ref) => {

	return (
		<Form$ ref={ ref } className={ 'file-list ' + className } { ...props }>
			<ul>
				{
					fileList.map((file, i) => (
						<li key={ file.name + i }>
							<Input
								styleAs={ InputLabelRight$ }
								className='file-select'
								type='checkbox'
								name={ file.name }
								value={ file.name }
								onChange={ () => 'handleSelectFile' }
								label={
									<AttachmentInfo
										as='label'
										htmlFor={ file.name }
										data={ file }
									/>
								}
							/>

							<a href={ BASE_URL + location.pathname + '/' + file.name }
								target='_blank'
								rel='noopener noreferrer'>
								view
						</a>
						</li>
					)) }
			</ul>
		</Form$>
	);
});

export default FileList;

const Form$ = styled.form`
	ul{
		display: flex;
		flex-direction: column-reverse;
		list-style: none;
		margin: 0 1rem;
	}
	
	li {
		display: flex;
		align-items: center;
		line-height: 1.7rem;
			
		$:hover {
			background: rgba(0, 0, 0, 0.03);
		}

		.file-select,
		.file-data {
			flex-grow: 1;
		}

		a {
			margin -left: auto;
			color: ${ CLR.PRIMARY };
			padding: 0 0.2rem;

				&: hover {
				opacity: 1;
				text-decoration: underline;
			}
		}
	}
`;
