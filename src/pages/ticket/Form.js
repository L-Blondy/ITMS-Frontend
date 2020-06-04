import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { Input, Select, Textarea, InputLabelLeftAbs$ } from '../../components/inputs';
import { formatDate } from '../../utils';
import { FlexRow$, FlexCol$ } from '../../components/flex';

const Form = ({ state, errors, handleChange, validateSubmission }) => {

	return (
		<FlexRow$$ as='form' onSubmit={ validateSubmission }>
			<FlexCol$$ className='sm-6'>
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
					disabled
				/>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Category'
					name='category'
					value={ state.category }
					errors={ errors.category }
					onChange={ handleChange }>
					<option value=''>-none-</option>
					{ Object.keys(state.categories).map(cat => (
						<option value={ cat } key={ cat }>{ cat }</option>
					)) }
				</Select>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Sub category'
					name='subCategory'
					value={ state.subCategory }
					errors={ errors.subCategory }
					onChange={ handleChange }>
					<option value=''>-none-</option>
					{ (state.categories[ state.category ] || []).map(cat => (
						<option value={ cat } key={ cat }>{ cat }</option>
					)) }
				</Select>
			</FlexCol$$>

			<FlexCol$$ className='sm-6'>
				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Status'
					name='status'
					type='text'
					style={ { textTransform: 'capitalize' } }
					value={ state.status }
					disabled
				/>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Impact'
					name='impact'
					value={ state.impact }
					errors={ errors.impact }
					onChange={ handleChange }>
					<option value='1'> 1 - Extensive/Widespread </option>
					<option value='2'> 2 - Significant/Large </option>
					<option value='3'> 3 - Moderate/Limited </option>
					<option value='4'> 4 - Minor/localized </option>
				</Select>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Urgency'
					name='urgency'
					value={ state.urgency }
					errors={ errors.urgency }
					onChange={ handleChange }>
					<option value="1"> 1 - Critical </option>
					<option value="2"> 2 - High </option>
					<option value="3"> 3 - Medium </option>
					<option value="4"> 4 - Non critical </option>
				</Select>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Priority'
					name='priority'
					value={ state.priority }
					errors={ errors.priority }
					onChange={ handleChange }
					disabled>
					<option value="P1"> P1 - Critical </option>
					<option value="P2"> P2 - High </option>
					<option value="P3"> P3 - Medium </option>
					<option value="P4"> P4 - Non critical </option>
				</Select>

				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Assignment group'
					name='assignmentGroup'
					type='text'
					value={ state.assignmentGroup }
					errors={ errors.assignmentGroup }
					onChange={ handleChange }
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
					autoComplete="off"
				/>
			</FlexCol$$>

			<ColFullWidth$ className='xs-12'>
				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Description'
					name='description'
					type='text'
					value={ state.description }
					errors={ errors.description }
					onChange={ handleChange }
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
			</ColFullWidth$>
		</FlexRow$$>
	);
};

export default Form;

const FlexRow$$ = styled(FlexRow$)`
	flex-wrap: wrap;
`;

const FlexCol$$ = styled(FlexCol$)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	&:nth-child(even){
		align-items: flex-end;
	}

	> * {
		margin-top: 1rem;
		margin-bottom: 0.3rem;
		width: 250px;
	}
`;

const ColFullWidth$ = styled(FlexCol$$)`
	> *  {
		width: 100% !important;
	}
`;
