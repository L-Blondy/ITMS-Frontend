import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { TicketCtx } from './TicketPageWithContext';
import { formatDate } from '../../../utils';
import TextareaAutosize from 'react-textarea-autosize';
import { Form$ } from '../';
import { activityCircle } from '/assets/icons';

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

	const { assignedTo, assignmentGroup, categories, category, createdOn, description, dueDate, escalation, id, impact, instructions, log, status, subCategory, updatedOn, urgency } = ticketCtx.state;

	return (
		<Form$$ onSubmit={ (e) => e.preventDefault() } spellCheck='false'>

			<div className='columns-container'>
				<div className='column'>

					<label htmlFor='id' className='label'>
						<span>Number</span>
						<input
							id='id'
							name='id'
							type='text'
							value={ id }
							disabled
						/>
					</label>

					<label htmlFor='createdOn' className='label'>
						<span>Created on</span>
						<input
							id='createdOn'
							name='createdOn'
							type='text'
							value={ formatDate(createdOn) }
							disabled
						/>
					</label>

					<label htmlFor='dueDate' className='label'>
						<span>Due date</span>
						<input
							id='dueDate'
							name='dueDate'
							type='text'
							value={ formatDate(dueDate) }
							disabled
						/>
					</label>

					<label htmlFor='escalation' className={ ticketCtx.changedProps.has('escalation') ? 'label live-updated' : 'label' }>
						<span>Escalation</span>
						<input
							id='escalation'
							name='escalation'
							type='text'
							value={ escalation === 0 ? 'None' : escalation === 1 ? 'Uplift' : 'Overdue' }
							disabled
						/>
					</label>

					<Select label='Category' name='category' value={ category } onChange={ e => ticketCtx.handleChange(e) }>
						<option value=''>-none-</option>
						{ Object.keys(categories).map(cat => (
							<option value={ cat } key={ cat }>{ cat }</option>
						)) }
					</Select>
					{/* <label htmlFor='category' className={ ticketCtx.changedProps.has('category') ? 'label live-updated' : 'label' }>
						<span>Category</span>
						<select id='category' name='category' onChange={ e => ticketCtx.handleChange(e) } value={ category } >
							<option value=''>-none-</option>
							{ Object.keys(categories).map(cat => (
								<option value={ cat } key={ cat }>{ cat }</option>
							)) }
						</select>
					</label> */}

					<label htmlFor='subCategory' className={ ticketCtx.changedProps.has('subCategory') ? 'label live-updated' : 'label' }>
						<span>Sub category</span>
						<select id='subCategory' name='subCategory' onChange={ e => ticketCtx.handleChange(e) } value={ subCategory } >
							<option value=''>-none-</option>
							{ (categories[ category ] || []).map(cat => (
								<option value={ cat } key={ cat }>{ cat }</option>
							)) }
						</select>
					</label>

				</div>

				<div className='column'>

					<label htmlFor='status' className={ ticketCtx.changedProps.has('status') ? 'label live-updated' : 'label' }>
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


					<label htmlFor='impact' className='label'>
						<span>Impact</span>
						<select id='impact' name='impact' onChange={ e => ticketCtx.handleChange(e) } value={ impact }>
							<option value='1'> 1 - Extensive/Widespread </option>
							<option value='2'> 2 - Significant/Large </option>
							<option value='3'> 3 - Moderate/Limited </option>
							<option value='4'> 4 - Minor/localized </option>
						</select>
					</label>

					<label htmlFor='urgency' className='label'>
						<span>Urgency</span>
						<select id='urgency' name='urgency' onChange={ e => ticketCtx.handleChange(e) } value={ urgency } >
							<option value="1"> 1 - Critical </option>
							<option value="2"> 2 - High </option>
							<option value="3"> 3 - Medium </option>
							<option value="4"> 4 - Non critical </option>
						</select>
					</label>

					<label htmlFor='priority' className={ ticketCtx.changedProps.has('priority') ? 'label live-updated' : 'label' }>
						<span>Priority</span>
						<input
							id='priority'
							name='priority'
							type='text'
							value={ getPriority() }
							disabled
						/>
					</label>

					<label htmlFor='assignmentGroup' className={ ticketCtx.changedProps.has('assignmentGroup') ? 'label live-updated' : 'label' }>
						<span>Assignment group</span>
						<input
							id='assignmentGroup'
							name='assignmentGroup'
							type='text'
							onChange={ e => ticketCtx.handleChange(e) }
							value={ assignmentGroup }
							autoComplete="off"
						/>
					</label>

					<label htmlFor='assignedTo' className={ ticketCtx.changedProps.has('assignedTo') ? 'label live-updated' : 'label' }>
						<span>Assigned to</span>
						<input
							id='assignedTo'
							name='assignedTo'
							type='text'
							onChange={ e => ticketCtx.handleChange(e) }
							value={ assignedTo }
							autoComplete="off"
						/>
					</label>

				</div>
			</div>

			<div className='full-width'>

				<label htmlFor='description' className={ ticketCtx.changedProps.has('description') ? 'label live-updated' : 'label' }>
					<span>Description</span>
					<input
						id='description'
						name='description'
						type='text'
						onChange={ e => ticketCtx.handleChange(e) }
						value={ description }
						autoComplete="off"
					/>
				</label>

				<label htmlFor='instructions' className={ ticketCtx.changedProps.has('instructions') ? 'label live-updated' : 'label' }>
					<span>Instructions</span>
					<TextareaAutosize
						id='instructions'
						name='instructions'
						onChange={ e => ticketCtx.handleChange(e) }
						value={ instructions }
						minRows={ 5 }
						maxRows={ 20 }
						autoComplete="off"
					/>
				</label>
				{ !/new$/.test(location.pathname) ? (<>
					<label htmlFor='log' className='label'>
						<span>Work notes</span>
						<TextareaAutosize
							id='log'
							name='log'
							onChange={ e => ticketCtx.handleChange(e) }
							value={ log }
							minRows={ 5 }
							maxRows={ 20 }
							autoComplete="off"
						/>
						<div>Required for resolution</div>
					</label>
				</>) : '' }

			</div>
		</Form$$>
	);
}

export default IncidentFields;

const Form$$ = styled(Form$)`

	.live-updated::before{
		content: '';
		position: absolute;
		right: 100%;
		height: 1.6em;
		width: 1.7em;
		background-image: url(${ activityCircle });
		background-repeat: no-repeat;
		background-position: center;
		background-size: 60%;
	}

	#log + div {
		color: transparent;
	}
	#log.invalid + div {
		color: red;
	}
`;


function Select({ label, name, onChange, value, children }) {
	return (
		<label className='label'>
			<span>{ label }</span>
			<select id={ name } name={ name } onChange={ onChange } value={ value } >
				{ children }
			</select>
		</label>
	);
}