import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { TicketCtx } from './TicketPageWithContext';
import { formatDate } from '../../../utils';
import TextareaAutosize from 'react-textarea-autosize';

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

	useEffect(() => {
		const { categories, category, subCategory } = ticketCtx.state;

		if (!categories[ category ])
			ticketCtx.setState({ ...ticketCtx.state, category: '', subCategory: '' });
		if (categories[ category ] && !categories[ category ].includes(subCategory))
			ticketCtx.setState({ ...ticketCtx.state, subCategory: '' });
	}, []);

	const { assignedTo, assignmentGroup, categories, category, createdOn, description, dueDate, escalation, id, impact, instructions, log, priority, status, subCategory, updatedOn, urgency } = ticketCtx.state;

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
							value={ id }
							disabled
						/>
					</label>

					<label htmlFor='createdOn'>
						<span>Created on</span>
						<input
							id='createdOn'
							name='createdOn'
							type='text'
							value={ formatDate(createdOn) }
							disabled
						/>
					</label>

					<label htmlFor='dueDate'>
						<span>Due date</span>
						<input
							id='dueDate'
							name='dueDate'
							type='text'
							value={ formatDate(dueDate) }
							disabled
						/>
					</label>

					<label htmlFor='escalation'>
						<span>Escalation</span>
						<input
							id='escalation'
							name='escalation'
							type='text'
							value={ escalation === 0 ? 'None' : escalation === 1 ? 'Uplift' : 'Overdue' }
							disabled
						/>
					</label>

					<label htmlFor='category'>
						<span>Category</span>
						<select id='category' name='category' onChange={ ticketCtx.handleChange } value={ category } >
							<option value=''>-none-</option>
							{ Object.keys(categories).map(cat => (
								<option value={ cat } key={ cat }>{ cat }</option>
							)) }
						</select>
					</label>

					<label htmlFor='subCategory'>
						<span>Sub category</span>
						<select id='subCategory' name='subCategory' onChange={ ticketCtx.handleChange } value={ subCategory } >
							<option value=''>-none-</option>
							{ (categories[ category ] || []).map(cat => (
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
							value={ status }
							style={ { textTransform: 'capitalize' } }
							disabled
						/>
					</label>


					<label htmlFor='impact'>
						<span>Impact</span>
						<select id='impact' name='impact' onChange={ ticketCtx.handleChange } value={ impact }>
							<option value='1'> 1 - Extensive/Widespread </option>
							<option value='2'> 2 - Significant/Large </option>
							<option value='3'> 3 - Moderate/Limited </option>
							<option value='4'> 4 - Minor/localized </option>
						</select>
					</label>

					<label htmlFor='urgency'>
						<span>Urgency</span>
						<select id='urgency' name='urgency' onChange={ ticketCtx.handleChange } value={ urgency } >
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
							value={ assignmentGroup }
							autoComplete="off"
						/>
					</label>

					<label htmlFor='assignedTo'>
						<span>Assigned to</span>
						<input
							id='assignedTo'
							name='assignedTo'
							type='text'
							onChange={ ticketCtx.handleChange }
							value={ assignedTo }
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
						value={ description }
						autoComplete="off"
					/>
				</label>

				<label htmlFor='instructions'>
					<span>Instructions</span>
					<TextareaAutosize
						id='instructions'
						name='instructions'
						onChange={ ticketCtx.handleChange }
						value={ instructions }
						minRows={ 5 }
						maxRows={ 20 }
						autoComplete="off"
					/>
				</label>
				{ !/new$/.test(location.pathname) ? (<>
					<label htmlFor='log'>
						<span>Work notes</span>
						<TextareaAutosize
							id='log'
							name='log'
							onChange={ ticketCtx.handleChange }
							value={ log }
							minRows={ 5 }
							maxRows={ 20 }
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
		padding-left: 0.45rem;
		padding-right: 0.45rem;
	}

	input, select {
		height: 1.6em;
	}

	input:disabled {
		background-color: #e7eded;
	}

	textarea {
		padding-top: 0.13rem;
		padding-bottom: 0.13rem;
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