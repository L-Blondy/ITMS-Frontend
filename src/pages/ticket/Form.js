import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { requirements, setPriority } from './';
import { Input, Select, Textarea, InputLabelLeftAbs$ } from '../../components/inputs';
import { Validation, formatDate } from '../../utils';
import { FlexRow$, FlexCol$ } from '../../components/flex';

const Form = React.forwardRef(({ initialState, validation }, ref) => {

	const [ category, setCategory ] = useState(initialState.category);
	const [ subCategory, setSubCategory ] = useState(initialState.subCategory);

	const { assignedTo, assignmentGroup, categories, createdOn, description, dueDate, escalation, id, impact, instructions, log, priority, status, updatedOn, urgency } = initialState;

	return (
		<FlexRow$$ ref={ ref } as='form'>
			<FlexCol$$ className='sm-6'>
				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Number'
					name='id'
					type='text'
					validation={ validation }
					defaultValue={ id }
					disabled
				/>

				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Created on'
					name='createdOn'
					type='text'
					defaultValue={ formatDate(createdOn) }
					disabled
				/>

				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Due date'
					name='dueDate'
					type='text'
					defaultValue={ formatDate(dueDate) }
					disabled
				/>

				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Escalation'
					name='escalation'
					type='text'
					defaultValue={ escalation === 0 ? 'None' : escalation === 1 ? 'Uplift' : 'Overdue' }
					disabled
				/>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Category'
					name='category'
					validation={ validation }
					value={ category }
					onChange={ (e) => { setCategory(e.target.value); setSubCategory(''); } }>
					<option value=''>-none-</option>
					{ Object.keys(categories).map(cat => (
						<option value={ cat } key={ cat }>{ cat }</option>
					)) }
				</Select>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Sub category'
					name='subCategory'
					validation={ validation }
					value={ subCategory }
					onChange={ e => setSubCategory(e.target.value) }>
					<option value=''>-none-</option>
					{ (categories[ category ] || []).map(cat => (
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
					defaultValue={ status }
					style={ { textTransform: 'capitalize' } }
					disabled
				/>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Impact'
					name='impact'
					onChange={ setPriority }
					defaultValue={ impact }>
					<option value='1'> 1 - Extensive/Widespread </option>
					<option value='2'> 2 - Significant/Large </option>
					<option value='3'> 3 - Moderate/Limited </option>
					<option value='4'> 4 - Minor/localized </option>
				</Select>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Urgency'
					name='urgency'
					onChange={ setPriority }
					defaultValue={ urgency }>
					<option value="1"> 1 - Critical </option>
					<option value="2"> 2 - High </option>
					<option value="3"> 3 - Medium </option>
					<option value="4"> 4 - Non critical </option>
				</Select>

				<Select
					styleAs={ InputLabelLeftAbs$ }
					label='Priority'
					name='priority'
					defaultValue={ priority }
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
					validation={ validation }
					type='text'
					defaultValue={ assignmentGroup }
					autoComplete="off"
				/>

				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Assigned to'
					name='assignedTo'
					validation={ validation }
					type='text'
					defaultValue={ assignedTo }
					autoComplete="off"
				/>
			</FlexCol$$>

			<ColFullWidth$ className='xs-12'>
				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Description'
					name='description'
					validation={ validation }
					type='text'
					defaultValue={ description }
					autoComplete="off"
				/>

				<Textarea
					styleAs={ InputLabelLeftAbs$ }
					label='Instructions'
					name='instructions'
					validation={ validation }
					type='text'
					defaultValue={ instructions }
					minRows={ 5 }
					maxRows={ 20 }
					autoComplete="off"
					spellCheck="off"
				/>

				{ !/new$/.test(location.pathname) ? (
					<Textarea
						styleAs={ InputLabelLeftAbs$ }
						label='Work notes'
						name='log'
						type='text'
						defaultValue={ log }
						minRows={ 5 }
						maxRows={ 20 }
						autoComplete="off"
					/>
				) : '' }
			</ColFullWidth$>
		</FlexRow$$>
	);
});

export default Form;

const FlexRow$$ = styled(FlexRow$)`
	margin-left: auto;
	margin-right: auto;
	width: 70%;
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
