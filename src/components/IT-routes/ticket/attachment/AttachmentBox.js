import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import * as SRC from '../../../../assets/icons';
import { Upload, Delete, Status } from '.';
import { Warning, DisableBg } from '../../../';
import { CLR } from '../../../../GlobalStyles';
import { AttachmentCtx, XHR } from './AttachmentWithContext';
import { TicketCtx } from '../TicketPageWithContext';

function AttachmentBox() {

	const attachmentCtx = useContext(AttachmentCtx);
	const ticketCtx = useContext(TicketCtx);

	return (
		<>
			<DisableBg />

			<AttachmentBox$ requestStatus={ attachmentCtx.request.status }>

				<div className='header'>
					<span>Attachments</span>
					<button className='close-btn' onClick={ () => ticketCtx.attachments.setIsOpened(false) } />
				</div>

				<Upload method='POST' encType='multipart/form-data' />

				<Delete method='DELETE' />

			</AttachmentBox$>

			<Status />
		</>
	);
}

export default AttachmentBox;

const AttachmentBox$ = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	min-width: 450px;
	z-index: 1003;
	${ props => {
		if (props.requestStatus.state !== XHR.UNSENT) {
			return `
				&::before {
					content:'';
					position: absolute;
					z-index: 1;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: rgba(0,0,0,0.25)
				}
				@supports(filter: brightness(0.75)){
					filter: brightness(0.75);
					pointer-events: none;

					&::before {
						background: none;
					}
				}
		`;
		}
	} }
	
	.header {
		padding-left: 1rem;
		padding-right: 1rem;
		font-size: 1.2rem;
		line-height: 3em;
		background: ${ CLR.PRIMARY };
		color: white;
		display: flex;
		justify-content: space-between;

		&>span {
			color: inherit;
		}

		.close-btn {
			font-size: 2rem;
			background: none;
			box-shadow: none;
			color: white;
			font-weight: bold;
			cursor: pointer;
			width: 20px;
			background-image: ${ `url(${ SRC.close })` };
			background-repeat: no-repeat;
			background-position: center;
			background-size: 20px;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 40px;
				height: 40px;
			}

			&:hover {
				opacity: 0.7;
			}
		}
	}
`;