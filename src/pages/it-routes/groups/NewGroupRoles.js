import styled from 'styled-components';
import React, { useState } from 'react';
import { FlexRow$, FlexCol$ } from '../../../components/flex';
import { Select, InputLabelTopAbs$ } from '../../../components/inputs';
import { Button, ButtonItemControl$, ButtonPrimary$ } from '../../../components/buttons';
import { CLR } from '../../../GlobalStyles';

function NewGroupRoles({ when, roles, setRoles, initialOptions }) {
	if (!when) return null;

	const [ selected, setSelected ] = useState('');
	const [ key, setKey ] = useState(Math.random());

	const addRole = () => { };

	return (
		<FlexRow$$>
			<FlexCol$ className='column'>
				{ initialOptions.map(option => (
					<Button styleAs={ Option$ } key={ option }>{ option }</Button>
				)) }
			</FlexCol$>

			<div className='controls'> { '<>' } </div>

			<FlexCol$ className='column'>
				{ roles.map(role => (
					<Button styleAs={ Option$ } key={ role }>{ role }</Button>
				)) }
			</FlexCol$>
		</FlexRow$$>
	);
}

export default NewGroupRoles;

const FlexRow$$ = styled(FlexRow$)`
	min-height: 270px;
	.column { 
		border: 1px solid ${ CLR.BORDER.PRIMARY };
		width: 230px;
		border-radius: 3px;
	}
`;

const Option$ = styled.button`
	line-height: 1.7em;
	text-align: left;
	background: none;
	padding-left: 0.5em;

	&:hover {
		background: #ceebef;
	}

	&:focus {
		background: ${CLR.PRIMARY };
		color: white;
		outline: none;
	}
`;
