import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { formatDate } from '../../utils';
import { FileLog, ChangeLog, WorkLog } from '../../components/logs';
import { FlexRow$, FlexCol$, FlexColReverse$ } from '../../components/flex';
import { CLR } from '../../GlobalStyles';

function WorknotesHistory({ worknotesHistory, state }) {
	if (!worknotesHistory.length) return null;

	return (
		<FlexColReverse$$>
			{ worknotesHistory.map((note, i) => (

				<WorkNote$ className={ note.type } key={ note.type + i }>

					<FlexRow$ className="header">
						<div className="user">{ note.user }</div>
						<div className="date">{ formatDate(note.date) }</div>
					</FlexRow$>

					<WorkLog
						className='log'
						when={ note.type === "workLog" }>
						{ note.log }
					</WorkLog>

					<ChangeLog
						className='log'
						when={ note.type === "changeLog" }>
						{ note.log }
					</ChangeLog>

					<FileLog
						className='log'
						when={ note.type === "fileLog" }
						state={ state }>
						{ note.file }
					</FileLog>

				</WorkNote$>
			)) }
		</FlexColReverse$$>
	);
}

export default WorknotesHistory;

const FlexColReverse$$ = styled(FlexColReverse$)`
	margin-top: 2rem;
	width: 70%;
	padding-bottom: 5rem;
	font-size: 15px;
	margin-left: auto;
	margin-right: auto;
	flex-wrap: nowrap;
`;

const WorkNote$ = styled(FlexCol$)`
	position: relative;
	border: 1px solid ${ CLR.BORDER.PRIMARY };
	border-radius: 3px;
	margin: 0.5rem 0;
	padding: 0.8rem 1.5rem;
	overflow: hidden;

	.header {
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.3rem;

		* { color: ${ CLR.FONT.LIGHT } }
	}

	.log {
		white-space: pre-wrap;
		padding-top: 0.5rem;
	}

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

	&.fileLog img {
		max-width: 100%;
		max-height: calc(20vh + 100px);
		display: block;
		margin: auto;
		box-shadow: 0 0 5px 0 #ddd;
	}
`;
