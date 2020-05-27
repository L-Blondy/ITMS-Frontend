import styled from 'styled-components';
import React from 'react';
import { CLR } from '../../../GlobalStyles';

function ColumnName({ handleSort, propName, sorting }) {

	return (
		<Button$ onClick={ handleSort }
			type='button'
			className={ `column-name ${ sorting }` }
			data-sortby={ propName } >
			{ toName(propName) }
		</Button$>
	);
}

export default ColumnName;

const toName = (prop) => {
	const dictionary = {
		'id': 'Number',
		'description': 'Description',
		'instructions': 'Instructions',
		'status': 'Status',
		'escalation': 'Escalation count',
		'urgency': 'Urgency',
		'impact': 'Impact',
		'priority': 'Priority',
		'assignmentGroup': 'Assignment group',
		'category': 'Category',
		'subCategory': 'Sub category',
		'createdOn': 'Created on',
		'updatedOn': 'Updated on',
		'dueDate': 'Due date',
		'fileList': 'File list',
		'assignedTo': 'Assigned to',
		'onHoldReason': 'On hold reason',
		'worknotesHistory': 'Worknotes history',
		'__v': 'Update count',
	};

	return dictionary[ prop ] || ' not mapped to any name';
};

const Button$ = styled.button`
	text-align: left;
	background: none;
	padding: 0 0.5em;
	text-align: left;
	font-weight: bold;
	position: relative;
	display: flex;
	align-items: center;

	&.ascending,
	&.descending {
		color: ${ CLR.PRIMARY_VIBRANT };

		&::after {
			content: '';
			margin-left: 0.7em;
			margin-bottom: 2px;
			height: 0;
			width: 0;
			border: 6px solid transparent;
			border-top: none;
			border-bottom:  10px solid currentColor;
		}
	}

	&.descending::after {
		transform: rotate(180deg);
	}
`;
