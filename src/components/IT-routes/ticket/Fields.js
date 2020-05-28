import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { TicketCtx } from './TicketPageWithContext';
import { formatDate } from '../../../utils';
import TextareaAutosize from 'react-textarea-autosize';
import { Form$ } from '../';
import { Input, Select } from '../../';
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

					<Input
						label='Number'
						name='id'
						type='text'
						value={ id }
						disabled
					/>

					<Input
						label='Created on'
						name='createdOn'
						type='text'
						value={ formatDate(createdOn) }
						disabled
					/>

					<Input
						label='Due date'
						name='dueDate'
						type='text'
						value={ formatDate(dueDate) }
						disabled
					/>

					<Input
						label='Escalation'
						name='escalation'
						type='text'
						value={ escalation === 0 ? 'None' : escalation === 1 ? 'Uplift' : 'Overdue' }
						className={ ticketCtx.changedProps.has('escalation') ? 'live-updated' : '' }
						disabled
					/>

					<Select
						label='Category'
						name='category'
						value={ category }
						onChange={ e => ticketCtx.handleChange(e) }
						className={ ticketCtx.changedProps.has('category') ? 'live-updated' : '' }>
						<option value=''>-none-</option>
						{ Object.keys(categories).map(cat => (
							<option value={ cat } key={ cat }>{ cat }</option>
						)) }
					</Select>

					<Select
						label='Sub category'
						name='subCategory'
						value={ subCategory }
						onChange={ e => ticketCtx.handleChange(e) }
						className={ ticketCtx.changedProps.has('subCategory') ? 'live-updated' : '' }>
						<option value=''>-none-</option>
						{ (categories[ category ] || []).map(cat => (
							<option value={ cat } key={ cat }>{ cat }</option>
						)) }
					</Select>

				</div>

				<div className='column'>

					<Input
						label='Status'
						name='status'
						type='text'
						value={ status }
						style={ { textTransform: 'capitalize' } }
						disabled
					/>

					<Select
						label='Impact'
						name='impact'
						value={ impact }
						onChange={ e => ticketCtx.handleChange(e) }>
						<option value='1'> 1 - Extensive/Widespread </option>
						<option value='2'> 2 - Significant/Large </option>
						<option value='3'> 3 - Moderate/Limited </option>
						<option value='4'> 4 - Minor/localized </option>
					</Select>

					<Select
						label='Urgency'
						name='urgency'
						value={ urgency }
						onChange={ e => ticketCtx.handleChange(e) }>
						<option value="1"> 1 - Critical </option>
						<option value="2"> 2 - High </option>
						<option value="3"> 3 - Medium </option>
						<option value="4"> 4 - Non critical </option>
					</Select>

					<Input
						label='Priority'
						name='priority'
						type='text'
						value={ getPriority() }
						className={ ticketCtx.changedProps.has('priority') ? 'live-updated' : '' }
						disabled
					/>

					<Input
						label='Assignment group'
						name='assignmentGroup'
						type='text'
						value={ assignmentGroup }
						onChange={ e => ticketCtx.handleChange(e) }
						className={ ticketCtx.changedProps.has('assignmentGroup') ? 'live-updated' : '' }
						autoComplete="off"
					/>

					<Input
						label='Assigned to'
						name='assignedTo'
						type='text'
						value={ assignedTo }
						onChange={ e => ticketCtx.handleChange(e) }
						className={ ticketCtx.changedProps.has('assignedTo') ? 'live-updated' : '' }
						autoComplete="off"
					/>

				</div>
			</div>

			<div className='full-width'>

				<Input
					label='Description'
					name='description'
					type='text'
					value={ description }
					onChange={ e => ticketCtx.handleChange(e) }
					className={ ticketCtx.changedProps.has('description') ? 'live-updated' : '' }
					autoComplete="off"
				/>

				<Input as={ TextareaAutosize }
					label='Instructions'
					name='instructions'
					type='text'
					value={ instructions }
					onChange={ e => ticketCtx.handleChange(e) }
					className={ ticketCtx.changedProps.has('instructions') ? 'live-updated' : '' }
					minRows={ 5 }
					maxRows={ 20 }
					autoComplete="off"
				/>

				{ !/new$/.test(location.pathname) ? (<>
					<Input as={ TextareaAutosize }
						label='Work notes'
						name='log'
						type='text'
						value={ log }
						onChange={ e => ticketCtx.handleChange(e) }
						minRows={ 5 }
						maxRows={ 20 }
						autoComplete="off"
						errorMessage='Required for resolution'
					/>

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




