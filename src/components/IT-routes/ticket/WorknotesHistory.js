import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { BASE_URL } from '/BASE_URL';
import { TicketCtx } from './TicketPageWithContext';
import { formatFileSize, formatDate } from '../../../utils';
import { TruncateLongText } from '../../';
import { CLR } from '../../../GlobalStyles';

function WorknotesHistory() {

	const ticketCtx = useContext(TicketCtx);

	if (ticketCtx.worknotesHistory.length)
		return (
			<WorknotesHistory$>
				{ ticketCtx.worknotesHistory.map((note, i) => (

					<div className={ 'worknote ' + note.type } key={ note.type + i }>
						<div className="header">
							<div className="user">{ note.user }</div>
							<div className="date">{ formatDate(note.date) }</div>
						</div>
						{ note.type === "workLog" && (
							<WorkLog>{ note.log }</WorkLog>
						) }

						{ note.type === "changeLog" && (
							<ChangeLog>{ note.log }</ChangeLog>
						) }

						{ note.type === "fileLog" && (
							<FileLog>{ note.file }</FileLog>
						) }
					</div>

				)) }
			</WorknotesHistory$>
		);
	else return null;
}

export default WorknotesHistory;

function WorkLog({ children: log }) {
	return (
		<div className="log">
			{ log }
		</div>
	);
}

function ChangeLog({ children: log }) {
	const logParts = log.split('/').filter(part => part);
	return (
		<div className="log">
			{ logParts.map((part, i) => {
				if (i % 6 === 0)
					return <Prop$ key={ part + i }>{ part + ' :' }</Prop$>;
				if (i % 2 === 0) {
					return <TruncateLongText limit={ 20 } key={ part + i }>{ part }</TruncateLongText>;
				}
				else
					return <I$ key={ part + i }>{ part }</I$>;
			}) }
		</div>
	);
}

function FileLog({ children: file }) {
	const ticketCtx = useContext(TicketCtx);
	const { pathname } = useLocation();

	const { mimetype, originalname } = file;
	const wasDeleted = ticketCtx.state.fileList.filter(fileData => fileData.name === originalname).length === 0;
	const isImage = mimetype.indexOf('image') === 0;

	if (wasDeleted) {
		return (
			<div className="log">
				<span>{ originalname } </span>
				<i className='light-font'>(deleted)</i>
			</div>
		);
	}

	if (isImage) {
		return (
			<div className="log">
				<img src={ BASE_URL + pathname + '/' + originalname } alt={ originalname } />
			</div>
		);
	}
	else { //is not an image
		return (
			<div className="log">
				<a href={ BASE_URL + pathname + '/' + originalname } target='_blank' rel='noopener noreferrer'>
					{ originalname }
				</a>
				<span className='light-font'>{ formatFileSize(file.size) }</span>
			</div>
		);
	}
}

const WorknotesHistory$ = styled.div`
	display: flex;
	flex-direction: column-reverse;
	padding-bottom: 5rem;
	width: 70%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 2rem;
	font-size: 15px;

	.user, .date {
		color: ${ CLR.FONT.LIGHT };
	}

	.worknote{
		position: relative;
		padding: 0.8rem 1.5rem;
		border-radius: 3px;
		margin: 0.5rem 0;
		overflow: hidden;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 5px;
		}

		&.workLog::before {
			background: gold;
		}

		&.changeLog::before {
			background: #bbb;
		}

		&.fileLog::before {
			background: ${ CLR.PRIMARY_VIBRANT };
		}
	}

	.header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.3rem;
		color: #777;
	}
	
	.log {
		white-space: pre-wrap;
		padding-top: 1rem;
		padding-bottom: 0.5rem;
	}

	a {
		color: #3582a2;
		font-weight: bold;
		text-decoration: underline;
	}

	.light-font {
		font-size: 0.9em;
		margin-left: 0.5rem;
	}
`;

const Prop$ = styled.span`
	display: inline-block;
	text-align: right;
	min-width: calc(50px + 5vw);
	margin-right: 0.6rem;
	text-transform: capitalize;
	line-height: 2rem;
`;

const Value$ = styled.span``;

const I$ = styled.i`
	color: ${ CLR.FONT.LIGHT };
	margin: 0 0.3rem;
`;