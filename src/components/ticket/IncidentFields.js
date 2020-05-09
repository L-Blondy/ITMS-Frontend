import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { TicketCtx } from './TicketContext';

function IncidentFields() {

	const Ticket = useContext(TicketCtx);

	const getPriority = () => {
		switch (Ticket.state.priority) {
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
							value={ Ticket.state.id }
							disabled
						/>
					</label>

					<label htmlFor='createdOn'>
						<span>Created on</span>
						<input
							id='createdOn'
							name='createdOn'
							type='text'
							value={ displayDate(Ticket.state.createdOn) }
							disabled
						/>
					</label>

					<label htmlFor='dueDate'>
						<span>Due date</span>
						<input
							id='dueDate'
							name='dueDate'
							type='text'
							value={ displayDate(Ticket.state.dueDate) }
							disabled
						/>
					</label>

					<label htmlFor='escalation'>
						<span>Escalation</span>
						<input
							id='escalation'
							name='escalation'
							type='text'
							value={ Ticket.state.escalation === 0 ? 'None' : Ticket.state.escalation === 1 ? 'Uplift' : 'Overdue' }
							disabled
						/>
					</label>

					<label htmlFor='category'>
						<span>Category</span>
						<select id='category' name='category' onChange={ Ticket.handleChange } value={ Ticket.state.category } >
							<option value=''>-none-</option>
							{ Ticket.state.staticData.category.map(cat => (
								<option value={ cat } key={ cat }>{ cat }</option>
							)) }
						</select>
					</label>

					<label htmlFor='subCategory'>
						<span>Sub category</span>
						<select id='subCategory' name='subCategory' onChange={ Ticket.handleChange } value={ Ticket.state.subCategory } >
							<option value=''>-none-</option>
							{ Ticket.state.staticData.subCategory.map(cat => (
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
							value={ Ticket.state.status }
							style={ { textTransform: 'capitalize' } }
							disabled
						/>
					</label>


					<label htmlFor='impact'>
						<span>Impact</span>
						<select id='impact' name='impact' onChange={ Ticket.handleChange } value={ Ticket.state.impact }>
							<option value='1'> 1 - Extensive/Widespread </option>
							<option value='2'> 2 - Significant/Large </option>
							<option value='3'> 3 - Moderate/Limited </option>
							<option value='4'> 4 - Minor/localized </option>
						</select>
					</label>

					<label htmlFor='urgency'>
						<span>Urgency</span>
						<select id='urgency' name='urgency' onChange={ Ticket.handleChange } value={ Ticket.state.urgency } >
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
							onChange={ Ticket.handleChange }
							value={ Ticket.state.assignmentGroup }
							autoComplete="off"
						/>
					</label>

					<label htmlFor='assignedTo'>
						<span>assignedTo</span>
						<input
							id='assignedTo'
							name='assignedTo'
							type='text'
							onChange={ Ticket.handleChange }
							value={ Ticket.state.assignedTo }
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
						onChange={ Ticket.handleChange }
						value={ Ticket.state.description }
						autoComplete="off"
					/>
				</label>

				<label htmlFor='instructions'>
					<span>Instructions</span>
					<textarea
						id='instructions'
						name='instructions'
						rows='5'
						onChange={ Ticket.handleChange }
						value={ Ticket.state.instructions }
						autoComplete="off"
					/>
				</label>
				{ location.pathname !== '/ticket/new' ? (<>
					<label htmlFor='log'>
						<span>Work notes</span>
						<textarea
							id='log'
							name='log'
							rows='5'
							onChange={ Ticket.handleChange }
							value={ Ticket.state.log }
							autoComplete="off"
						/>
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
		border: 1px solid #bbb;
		padding-left: 0.45rem;
	}

	input, select {
		height: 1.6em;
	}

	textarea {
		padding-top: 0.12rem;
		resize: none;
	}

	button {
		margin-top: 1.5rem;
		align-self: flex-start;	
	} 
`;