import styled from 'styled-components';
import React, { useState } from 'react';
import { FlexRow$, FlexCol$ } from '../../../components/flex';
import { Button, ButtonCommon$ } from '../../../components/buttons';
import { CLR, FONT_FAM } from '../../../GlobalStyles';
import { chevron3 } from '/assets/icons';
import { SelectColumns, InputCommon$ } from '../../../components/inputs';

function NewGroupRoles({ when, roles, setRoles, initialOptions }) {
	if (!when) return null;

	// const [ selected, setSelected ] = useState('');

	// const addRole = () => { };

	// const handleSelect = (e) => {
	// 	console.log(e.target.dataset.option);
	// };

	return (
		<SelectColumns
			styleAs={ InputCommon$ }
			minHeight='270px'
			columnWidth='230px'
			columnNameLeft='Available roles'
			columnNameRight='Selected roles'
			options={ initialOptions }
		/>
	);

	// return (
	// 	<FlexRow$$>
	// 		<FlexCol$>
	// 			<div className='column-name'>
	// 				Available roles
	// 			</div>

	// 			<FlexCol$ className='column' onClick={ handleSelect }>
	// 				{ initialOptions.map(option => (
	// 					<Button
	// 						styleAs={ Option$ }
	// 						key={ option }
	// 						type='button'
	// 						data-option={ option }>
	// 						{ option }
	// 					</Button>
	// 				)) }
	// 			</FlexCol$>
	// 		</FlexCol$>

	// 		<FlexCol$ className='controls'>
	// 			<Button
	// 				styleAs={ AddRole$ }
	// 				type='button'>
	// 				<img src={ chevron3 } alt='add' />
	// 			</Button>

	// 			<Button
	// 				styleAs={ RemoveRole$ }
	// 				type='button'
	// 				disabled>
	// 				<img src={ chevron3 } alt='add' />
	// 			</Button>
	// 		</FlexCol$>

	// 		<FlexCol$>
	// 			<div className='column-name'>
	// 				Selected roles
	// 			</div>

	// 			<FlexCol$ className='column'>
	// 				{ roles.map(role => (
	// 					<Button
	// 						styleAs={ Option$ }
	// 						key={ role }
	// 						type='button'>
	// 						{ role }
	// 					</Button>
	// 				)) }
	// 			</FlexCol$>
	// 		</FlexCol$>
	// 	</FlexRow$$>
	// );
}

export default NewGroupRoles;

const FlexRow$$ = styled(FlexRow$)`
	align-items: center;

	.column-name {
		line-height: 2em;
		/* font-family: ${ FONT_FAM.SECONDARY }; */
	}

	.column { 
		border: 1px solid ${ CLR.BORDER.PRIMARY };
		width: 230px;
		min-height: 270px;
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

const RoleControlButton$ = styled(ButtonCommon$)`
	height: 1.5rem;
	width: 1.5rem;
	padding: 0;
	margin: 0.2rem 0.7rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 3px;
	background: ${ CLR.PRIMARY };

	img {
		height: 48%;
		padding-bottom: 1px;
	}
`;

const AddRole$ = styled(RoleControlButton$)`
	img {
		transform: rotate(90deg);
	}
`;

const RemoveRole$ = styled(RoleControlButton$)`
	img {
		transform: rotate(-90deg);
	}
`;
