import React from 'react';
import styled from 'styled-components';
import { formatDate } from '#/utils';
import { FileLog, ChangeLog, WorkLog } from '#/components/worklogs';
import { FlexRow$, FlexCol$ } from '#/components/flex';
import { CLR } from '#/GlobalStyles';

function WorknotesHistory({ worknotesHistory, fileList }) {
	if (!worknotesHistory.length) return null;

	let used = [];
	return (
		<div>
			<FlexColReverse$$ className='worknotes'>
				{
					worknotesHistory.map(({ type, user, date, file, log }, i) => {

						return (
							<Worknote$ className={ 'worknote ' + type } key={ type + i }>

								<FlexRow$ className="header">
									<div className="user">{ user }</div>
									<div className="date">{ formatDate(date) }</div>
								</FlexRow$>

								{ type === "workLog" && (
									<WorkLog className='log'>
										{ log }
									</WorkLog>
								) }

								{ type === "changeLog" && (
									<ChangeLog className='log'>
										{ log }
									</ChangeLog>
								) }
								{ type === "fileLog" && (
									<FileLog className='log' fileList={ fileList } used={ used }>
										{ file }
									</FileLog>
								) }
							</Worknote$>
						);
					})
				}
			</FlexColReverse$$>
		</div>
	);
}

export default React.memo(WorknotesHistory);

const FlexColReverse$$ = styled(FlexCol$)`
	margin-top: 2rem;
	padding-bottom: 5rem;
	font-size: 15px;
	margin-left: auto;
	margin-right: auto;
	position: absolute;
	width: 70%;
	max-height: initial;
`;

const Worknote$ = styled.div`
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	max-width: 100%;
	max-height: 100%;
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
`;

