import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { TicketCtx } from './TicketPageWithContext';

function IncidentFields() {

	const ticketCtx = useContext(TicketCtx);

	const getPriority = () => {
		switch (ticketCtx.state.priority) {
			case 'P1':
				return 'P1 - Critical';
			case 'P2':
				return 'P2 - High';
			case 'P3':
				return 'P3 - Medium';
			case 'P4':
				return 'P4 - Non critical';
		}
	};

	const displayDate = (strDate, timezone = []) => {
		if (!strDate) return '-';
		const dateAndTime = new Date(strDate);
		const date = dateAndTime.toLocaleDateString(timezone);
		const time = dateAndTime.toLocaleTimeString(timezone, { hour: '2-digit', minute: '2-digit' });
		return date + '  ' + time;
	};

	return (
		<Form$ onSubmit={ (e) => e.preventDefault() }>

			<div className='main-fields'>
				<div className='column'>

					<label htmlFor='number'>
						<span>Number</span>
						<input
							id='number'
							name='number'
							type='text'
							value={ ticketCtx.state.id }
							disabled
						/>
					</label>

					<label htmlFor='createdOn'>
						<span>Created on</span>
						<input
							id='createdOn'
							name='createdOn'
							type='text'
							value={ displayDate(ticketCtx.state.createdOn) }
							disabled
						/>
					</label>

					<label htmlFor='dueDate'>
						<span>Due date</span>
						<input
							id='dueDate'
							name='dueDate'
							type='text'
							value={ displayDate(ticketCtx.state.dueDate) }
							disabled
						/>
					</label>

					<label htmlFor='escalation'>
						<span>Escalation</span>
						<input
							id='escalation'
							name='escalation'
							type='text'
							value={ ticketCtx.state.escalation === 0 ? 'None' : ticketCtx.state.escalation === 1 ? 'Uplift' : 'Overdue' }
							disabled
						/>
					</label>

					<label htmlFor='category'>
						<span>Category</span>
						<select id='category' name='category' onChange={ ticketCtx.handleChange } value={ ticketCtx.state.category } >
							<option value=''>-none-</option>
							{ Object.keys(ticketCtx.state.categories).map(cat => (
								<option value={ cat } key={ cat }>{ cat }</option>
							)) }
						</select>
					</label>

					<label htmlFor='subCategory'>
						<span>Sub category</span>
						<select id='subCategory' name='subCategory' onChange={ ticketCtx.handleChange } value={ ticketCtx.state.subCategory } >
							<option value=''>-none-</option>
							{ ticketCtx.state.category && ticketCtx.state.categories[ ticketCtx.state.category ].map(cat => (
								<option value={ cat } key={ cat }>{ cat }</option>
							)) }
						</select>
					</label>

				</div>

				<div className='column'>

					<label htmlFor='status'>
						<span>Status</span>
						<input
							id='status'
							name='status'
							type='text'
							value={ ticketCtx.state.status }
							style={ { textTransform: 'capitalize' } }
							disabled
						/>
					</label>


					<label htmlFor='impact'>
						<span>Impact</span>
						<select id='impact' name='impact' onChange={ ticketCtx.handleChange } value={ ticketCtx.state.impact }>
							<option value='1'> 1 - Extensive/Widespread </option>
							<option value='2'> 2 - Significant/Large </option>
							<option value='3'> 3 - Moderate/Limited </option>
							<option value='4'> 4 - Minor/localized </option>
						</select>
					</label>

					<label htmlFor='urgency'>
						<span>Urgency</span>
						<select id='urgency' name='urgency' onChange={ ticketCtx.handleChange } value={ ticketCtx.state.urgency } >
							<option value="1"> 1 - Critical </option>
							<option value="2"> 2 - High </option>
							<option value="3"> 3 - Medium </option>
							<option value="4"> 4 - Non critical </option>
						</select>
					</label>

					<label htmlFor='priority'>
						<span>Priority</span>
						<input
							id='priority'
							name='priority'
							type='text'
							value={ getPriority() }
							disabled
						/>
					</label>

					<label htmlFor='assignmentGroup'>
						<span>Assignment group</span>
						<input
							id='assignmentGroup'
							name='assignmentGroup'
							type='text'
							onChange={ ticketCtx.handleChange }
							value={ ticketCtx.state.assignmentGroup }
							autoComplete="off"
						/>
					</label>

					<label htmlFor='assignedTo'>
						<span>assignedTo</span>
						<input
							id='assignedTo'
							name='assignedTo'
							type='text'
							onChange={ ticketCtx.handleChange }
							value={ ticketCtx.state.assignedTo }
							autoComplete="off"
						/>
					</label>

				</div>
			</div>

			<div className='text-fields'>

				<label htmlFor='description'>
					<span>Description</span>
					<input
						id='description'
						name='description'
						type='text'
						onChange={ ticketCtx.handleChange }
						value={ ticketCtx.state.description }
						autoComplete="off"
					/>
				</label>

				<label htmlFor='instructions'>
					<span>Instructions</span>
					<textarea
						id='instructions'
						name='instructions'
						rows='5'
						onChange={ ticketCtx.handleChange }
						value={ ticketCtx.state.instructions }
						autoComplete="off"
					/>
				</label>
				{ !/new$/.test(location.pathname) ? (<>
					<label htmlFor='log'>
						<span>Work notes</span>
						<textarea
							id='log'
							name='log'
							rows='5'
							onChange={ ticketCtx.handleChange }
							value={ ticketCtx.state.log }
							autoComplete="off"
						/>
						<div>Required for resolution</div>
					</label>
				</>) : '' }

			</div>
		</Form$>
	);
}

export default IncidentFields;

const Form$ = styled.form`
	position: relative;
	font-size: 14px;
	margin-bottom: 3rem;
	padding-top:1rem;
	width: 70%;
	margin: auto;

	.invalid{
		background: rgba(255,0,0,0.020);
		outline-color: rgba(255,0,0,0.53);
		border-color: rgba(255,0,0,0.53);
	}

	.main-fields {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.text-fields {
		display: flex;
		flex-direction: column;
		margin-top: 1.5rem;
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: calc(100px + 20% )
	}

	label {
		position: relative;
		margin-top: 1rem;
		margin-bottom: 0.3rem;
	}

	span {
		position: absolute;
		right: calc(100% + 1.5rem);
		white-space: nowrap;
	}

	input, textarea, select {
		width: 100%;
		font-size: inherit;
		border-radius: 3px;
		border: 1px solid #a3bec2;
		padding-left: 0.45rem;
	}

	input, select {
		height: 1.6em;
	}

	input:disabled {
		background-color: #e7eded;
	}

	textarea {
		padding-top: 0.12rem;
		resize: none;
	}

	button {
		margin-top: 1.5rem;
		align-self: flex-start;	
	} 

	#log + div {
		color: transparent;
	}
	#log.invalid + div {
		color: red;
	}
`;