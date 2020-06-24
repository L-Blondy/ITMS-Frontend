import styled from 'styled-components';
import React from 'react';
import { formatDate } from '../../../utils';
import { Input, Select, Textarea, InputLabelLeftAbs$ } from '../../../components/inputs';
import { FlexRow$ } from '../../../components/flex';
import { InputContainer$, InputContainerFullWidth$ } from '../../../components/containers';
import { activityCircle } from '/assets/icons';

const Fields = ({ state, errors, handleChange, validateSubmission, changedFields }) => {

	return (
		<FlexRow$$ as='form' onSubmit={ validateSubmission }>
			<InputContainer$ className='sm-6'>
				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Number'
					name='id'
					type='text'
					value={ state.id }
					disabled
				/>

				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Created on'
					name='createdOn'
					type='text'
					value={ formatDate(state.createdOn) }
					disabled
				/>

				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Due date'
					name='dueDate'
					type='text'
					value={ formatDate(state.dueDate) }
					disabled
				/>

				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Escalation'
					name='escalation'
					type='text'
					value={ state.escalation === 0 ? 'none' : state.escalation === 1 ? 'uplift' : 'overdue' }
					className={ changedFields.has('escalation') ? 'updated' : '' }
					disabled
				/>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Category'
					name='category'
					errors={ errors.category }
					value={ state.category }
					onChange={ handleChange }
					className={ changedFields.has('category') ? 'updated' : '' }
					options={ Object.keys(state.categories).reduce((options, cat) => (
						[ ...options, { value: cat, label: cat } ]
					), [ { value: '', label: '-none-' } ]) }
				/>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Sub category'
					name='subCategory'
					value={ state.subCategory }
					errors={ errors.subCategory }
					onChange={ handleChange }
					className={ changedFields.has('subCategory') ? 'updated' : '' }
					options={ (state.categories[ state.category ] || []).reduce((options, cat) => (
						[ ...options, { value: cat, label: cat } ]
					), [ { value: '', label: '-none-' } ]) }
				/>

			</InputContainer$>

			<InputContainer$ className='sm-6'>
				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Status'
					name='status'
					type='text'
					style={ { textTransform: 'capitalize' } }
					value={ state.status }
					className={ changedFields.has('status') ? 'updated' : '' }
					disabled
				/>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Impact'
					name='impact'
					value={ state.impact }
					errors={ errors.impact }
					onChange={ handleChange }
					options={ [
						{ value: '1', label: '1 - Extensive/Widespread' },
						{ value: '2', label: '2 - Significant/Large' },
						{ value: '3', label: '3 - Moderate/Limited' },
						{ value: '4', label: '4 - Minor/localized' },
					] }
				/>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Urgency'
					name='urgency'
					value={ state.urgency }
					errors={ errors.urgency }
					onChange={ handleChange }
					options={ [
						{ value: '1', label: '1 - Critical' },
						{ value: '2', label: '2 - High' },
						{ value: '3', label: '3 - Medium' },
						{ value: '4', label: '4 - Non critical' },
					] }
				/>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Priority'
					name='priority'
					value={ state.priority }
					errors={ errors.priority }
					onChange={ handleChange }
					className={ changedFields.has('priority') ? 'updated' : '' }
					disabled
					options={ [
						{ value: 'P1', label: '1 - Critical' },
						{ value: 'P2', label: '2 - High' },
						{ value: 'P3', label: '3 - Medium' },
						{ value: 'P4', label: '4 - Non critical' },
					] }
				/>

				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Assignment group'
					name='assignmentGroup'
					type='text'
					value={ state.assignmentGroup }
					errors={ errors.assignmentGroup }
					onChange={ handleChange }
					className={ changedFields.has('assignmentGroup') ? 'updated' : '' }
					autoComplete="off"
				/>

				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Assigned to'
					name='assignedTo'
					type='text'
					value={ state.assignedTo }
					errors={ errors.assignedTo }
					onChange={ handleChange }
					className={ changedFields.has('priority') ? 'updated' : '' }
					autoComplete="off"
				/>
			</InputContainer$>

			<InputContainerFullWidth$ className='xs-12'>
				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Description'
					name='description'
					type='text'
					value={ state.description }
					errors={ errors.description }
					onChange={ handleChange }
					className={ changedFields.has('description') ? 'updated' : '' }
					autoComplete="off"
				/>

				<Textarea
					styleAs={ InputLabelLeftAbs$ }
					label='Instructions'
					name='instructions'
					type='text'
					minRows={ 5 }
					maxRows={ 20 }
					value={ state.instructions }
					errors={ errors.instructions }
					onChange={ handleChange }
					className={ changedFields.has('instructions') ? 'updated' : '' }
					autoComplete="off"
					spellCheck="off"
				/>

				{ !/new$/.test(location.pathname) ? (
					<Textarea
						styleAs={ InputLabelLeftAbs$ }
						label='Work notes'
						name='log'
						type='text'
						minRows={ 5 }
						maxRows={ 20 }
						value={ state.log }
						errors={ errors.log }
						onChange={ handleChange }
						autoComplete="off"
					/>
				) : '' }
			</InputContainerFullWidth$>
		</FlexRow$$>
	);
};

export default Fields;

const FlexRow$$ = styled(FlexRow$)`
	flex-wrap: wrap;

	.updated::before{
		content: '';
		font-size: 14px;
		position: absolute;
		right: 100%;
		height: 1.5em;
		width: 1.7em;
		background-image: url(${ activityCircle });
		background-repeat: no-repeat;
		background-position: center;
		background-size: 60%;
	}
`;