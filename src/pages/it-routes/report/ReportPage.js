import styled from 'styled-components';
import React from 'react';
import { ControlBar$ } from '../../../components/navs';
import { FlexCol$, FlexRow$ } from '../../../components/flex';
import { InputContainer$, InputContainerFullWidth$ } from '../../../components/containers';
import { Button, ButtonControlBar$ } from '../../../components/buttons';
import { Select, InputLabelLeftAbs$ } from '../../../components/inputs';

function ReportPage() {

	return (<>
		<ControlBar$>
			<div />
			<Button
				styleAs={ ButtonControlBar$ }
				onClick={ e => console.log(e.target) } >
				Run
			</Button>
		</ControlBar$>

		<FlexCol$$>
			<FlexRow$>

				<InputContainer$ className='sm-6'>

					<Select styleAs={ InputLabelLeftAbs$ } label='Data' name='data'>
						<option value=""> -none- </option>
						<option value="incidents"> Incident </option>
						<option value="requests"> Request </option>
						<option value="changes"> Change </option>
					</Select>

					<Select styleAs={ InputLabelLeftAbs$ } label='Type' name='type'>
						<option value="list"> List </option>
						<option value="single Score"> Single Score </option>
						<option value="bar"> Bar </option>
						<option value="donut"> Donut </option>
					</Select>

				</InputContainer$>

				<InputContainer$ className='sm-6'>
					6
				</InputContainer$>

			</FlexRow$>

			<InputContainerFullWidth$ className='xs-12'>
				<FlexRow$>
					<Button
						styleAs={ ButtonControlBar$ }
						onClick={ () => { } } >
						Add filter condition
					</Button>
					<Button
						styleAs={ ButtonControlBar$ }
						onClick={ () => { } } >
						Add "OR" clause
					</Button>
				</FlexRow$>
			</InputContainerFullWidth$>

			<InputContainerFullWidth$ className='xs-12'>
				12
			</InputContainerFullWidth$>

		</FlexCol$$>
	</>);
}

export default ReportPage;

const FlexCol$$ = styled(FlexCol$)`
	width: 70%;
	margin: 0 auto;
`;
