import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { TicketCtx } from './TicketPageWithContext';
import { formatDate } from '../../../utils';
import { Form$ } from '../';
import { Input, Select, Textarea, InputLabelLeftAbs$ } from '../../inputs';
import { activityCircle } from '/assets/icons';

function Fields() {

	const ticketCtx = useContext(TicketCtx);

	useEffect(() => {
		const { categories, category, subCategory } = ticketCtx.state;

		if (!categories[ category ])
			ticketCtx.setState({ ...ticketCtx.state, category: '', subCategory: '' });
		if (categories[ category ] && !categories[ category ].includes(subCategory))
			ticketCtx.setState({ ...ticketCtx.state, subCategory: '' });
	}, []);

	const { assignedTo, assignmentGroup, categories, category, createdOn, description, dueDate, escalation, id, impact, instructions, log, priority, status, subCategory, updatedOn, urgency } = ticketCtx.state;

	return (
		<Form$$ onSubmit={ (e) => e.preventDefault() } spellCheck='false'>

			<div className='columns-container'>
				<div className='column'>

					<Input
						styleAs={ InputLabelLeftAbs$ }
						label='Number'
						name='id'
						type='text'
						value={ id }
						disabled
					/>

					<Input
						styleAs={ InputLabelLeftAbs$ }
						label='Created on'
						name='createdOn'
						type='text'
						value={ formatDate(createdOn) }
						disabled
					/>

					<Input
						styleAs={ InputLabelLeftAbs$ }
						label='Due date'
						name='dueDate'
						type='text'
						value={ formatDate(dueDate) }
						disabled
					/>

					<Input
						styleAs={ InputLabelLeftAbs$ }
						label='Escalation'
						name='escalation'
						type='text'
						value={ escalation === 0 ? 'None' : escalation === 1 ? 'Uplift' : 'Overdue' }
						className={ ticketCtx.changedProps.has('escalation') ? 'live-updated' : '' }
						disabled
					/>

					<Select
						styleAs={ InputLabelLeftAbs$ }
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
						styleAs={ InputLabelLeftAbs$ }
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
						styleAs={ InputLabelLeftAbs$ }
						label='Status'
						name='status'
						type='text'
						value={ status }
						style={ { textTransform: 'capitalize' } }
						disabled
					/>

					<Select
						styleAs={ InputLabelLeftAbs$ }
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
						styleAs={ InputLabelLeftAbs$ }
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
						styleAs={ InputLabelLeftAbs$ }
						label='Priority'
						name='priority'
						type='text'
						value={ priority }
						className={ ticketCtx.changedProps.has('priority') ? 'live-updated' : '' }
						disabled
					/>

					<Input
						styleAs={ InputLabelLeftAbs$ }
						label='Assignment group'
						name='assignmentGroup'
						type='text'
						value={ assignmentGroup }
						onChange={ e => ticketCtx.handleChange(e) }
						className={ ticketCtx.changedProps.has('assignmentGroup') ? 'live-updated' : '' }
						autoComplete="off"
					/>

					<Input
						styleAs={ InputLabelLeftAbs$ }
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
					styleAs={ InputLabelLeftAbs$ }
					label='Description'
					name='description'
					type='text'
					value={ description }
					onChange={ e => ticketCtx.handleChange(e) }
					className={ ticketCtx.changedProps.has('description') ? 'live-updated' : '' }
					autoComplete="off"
				/>

				<Textarea
					styleAs={ InputLabelLeftAbs$ }
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

				{ !/new$/.test(location.pathname) ? (
					<Textarea
						styleAs={ InputLabelLeftAbs$ }
						label='Work notes'
						name='log'
						type='text'
						value={ log }
						onChange={ e => ticketCtx.handleChange(e) }
						minRows={ 5 }
						maxRows={ 20 }
						autoComplete="off"
					/>
				) : '' }

			</div>
		</Form$$>
	);
}

export default Fields;

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

	.labelled-input {
		margin-top: 1rem;
		margin-bottom: 0.3rem;
	}

	#log + div {
		color: transparent;
	}
	#log.invalid + div {
		color: red;
	}
`;




