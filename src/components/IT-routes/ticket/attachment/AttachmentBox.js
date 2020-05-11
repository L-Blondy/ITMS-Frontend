import React, { useContext } from 'react';
import styled from 'styled-components';
import * as SRC from '../../../../assets/icons';
import { Upload, Delete, Warning, Status } from '.';
import { CLR } from '../../../../GlobalStyles';
import { AttachmentCtx, XHR } from './AttachmentWithContext';
import { TicketCtx } from '../TicketPageWithContext';

function AttachmentBox() {

	const attachmentCtx = useContext(AttachmentCtx);
	const ticketCtx = useContext(TicketCtx);

	return (
		<DisableBg$>
			<AttachmentBox$ requestStatus={ attachmentCtx.request.status } isWarning={ attachmentCtx.deletion.isWarning }>

				<div className='header'>
					<span>Attachments</span>
					<button className='close-btn' onClick={ () => ticketCtx.attachments.setIsOpened(false) }></button>
				</div>

				<Upload method='POST' encType='multipart/form-data' />

				<Delete method='DELETE' />

			</AttachmentBox$>

			<Status />

			<Warning message='Are you sure ?' />

		</DisableBg$>
	);
}

export default AttachmentBox;

const DisableBg$ = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1002;
	background: rgba(0,0,0,0.4);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const AttachmentBox$ = styled.div`
	background: white;
	min-width: 450px;
	${ props => {
		if (props.requestStatus.state !== XHR.UNSENT || props.isWarning) {
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