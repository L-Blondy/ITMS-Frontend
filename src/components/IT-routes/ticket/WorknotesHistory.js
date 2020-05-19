import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { BASE_URL } from '/BASE_URL';
import { TicketCtx } from './TicketPageWithContext';

function WorknotesHistory() {

	const ticketCtx = useContext(TicketCtx);
	const { pathname } = useLocation();

	function renderLog(note) {
		if (note.type === "workLog") {
			return note.log;
		}
		else if (note.type === "changeLog") {
			const logParts = note.log.split('/').filter(part => part);
			return logParts.map((part, i) => {
				if (i % 6 === 0)
					return <Prop$ key={ part + i }>{ part + ' :' }</Prop$>;
				if (i % 2 === 0)
					return <Value$ key={ part + i }>{ part }</Value$>;
				else
					return <I$ key={ part + i }>{ part }</I$>;
			});
		}
		else if (note.type === "fileLog") {
			const { mimetype, originalname } = note.file;

			if (!ticketCtx.state.fileList.filter(fileData => fileData.name === originalname).length) {
				return (<>
					<span>{ originalname } </span><i className='light-font'>(deleted)</i>
				</>);
			}

			if (mimetype.indexOf('image') === 0) {
				return (
					<img src={ BASE_URL + pathname + '/' + originalname } alt={ originalname } />
				);
			}
			else {
				const size = note.file.size < 1000 ? `  (${ note.file.size }kb)` : `  (${ (note.file.size / 1000).toFixed(1) }mb)`;
				return (<>
					<a href={ BASE_URL + pathname + '/' + originalname } target='_blank' rel='noopener noreferrer'>
						{ originalname }
					</a>
					<span className='light-font'>{ size }</span>
				</>);
			}
		}
		return 'Note type not recognized';
	}

	if (ticketCtx.worknotesHistory.length)
		return (
			<WorknotesHistory$>
				{ ticketCtx.worknotesHistory.map((note, i) => (

					<div className={ 'worknote ' + note.type } key={ note.type + i }>
						<div className="header">
							<div className="user">{ note.user }</div>
							<div className="date">{ note.date }</div>
						</div>
						<div className="log">{ renderLog(note) }</div>
					</div>

				)) }
			</WorknotesHistory$>
		);
	else return null;
}

export default WorknotesHistory;

function WorkLog(log) {
	return (
		<div className="log">{ log }</div>
	);
}

const WorknotesHistory$ = styled.div`
	display: flex;
	flex-direction: column-reverse;
	padding-bottom: 5rem;
	width: 70%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 2rem;

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
`;

const Prop$ = styled.span`
	display: inline-block;
	text-align: right;
	width: 150px;
	margin-right: 0.6rem;
	text-transform: capitalize;
	line-height: 2rem;
`;

const Value$ = styled.span``;

const I$ = styled.i`
	color: #999;
	margin: 0 0.3rem;
`;