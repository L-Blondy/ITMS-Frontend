import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { requirements, setPriority } from './';
import { Input, Select, Textarea, InputLabelLeftAbs$ } from '../../components/inputs';
import { Validation, formatDate } from '../../utils';
import { Row$, Col12$, Col12md6$ } from '../../components/grid';

function Form({ initialState }) {

	const [ category, setCategory ] = useState(initialState.category);
	const [ subCategory, setSubCategory ] = useState(initialState.subCategory);

	const { assignedTo, assignmentGroup, categories, createdOn, description, dueDate, escalation, id, impact, instructions, log, priority, status, updatedOn, urgency } = initialState;

	return (
		<Row$$ as='form'>
			<Col12md6$$>
				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Number'
					name='id'
					type='text'
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
					value={ subCategory }
					onChange={ e => setSubCategory(e.target.value) }>
					<option value=''>-none-</option>
					{ (categories[ category ] || []).map(cat => (
						<option value={ cat } key={ cat }>{ cat }</option>
					)) }
				</Select>
			</Col12md6$$>

			<Col12md6$$>
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
					type='text'
					defaultValue={ assignmentGroup }
					autoComplete="off"
				/>

				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Assigned to'
					name='assignedTo'
					type='text'
					defaultValue={ assignedTo }
					autoComplete="off"
				/>
			</Col12md6$$>

			<Col12$$>
				<Input
					styleAs={ InputLabelLeftAbs$ }
					label='Description'
					name='description'
					type='text'
					defaultValue={ description }
					autoComplete="off"
				/>

				<Textarea
					styleAs={ InputLabelLeftAbs$ }
					label='Instructions'
					name='instructions'
					type='text'
					defaultValue={ instructions }
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
						defaultValue={ log }
						minRows={ 5 }
						maxRows={ 20 }
						autoComplete="off"
					/>
				) : '' }
			</Col12$$>
		</Row$$>
	);
}

export default Form;

const Row$$ = styled(Row$)`
	margin-left: auto;
	margin-right: auto;
	width: 70%;
`;

const Col12md6$$ = styled(Col12md6$)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	&:nth-child(even){
		align-items: flex-end
	;}

	> * {
		margin-top: 1rem;
		margin-bottom: 0.3rem;
		width: 250px;
	}
`;

const Col12$$ = styled(Col12$)`
	> * {
		margin-top: 1rem;
		margin-bottom: 0.3rem;
		width: 250px;
	}
`;
