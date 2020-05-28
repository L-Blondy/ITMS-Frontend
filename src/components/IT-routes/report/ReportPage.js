import styled from 'styled-components';
import React from 'react';
import { ControlBar$, Form$ } from '../';
// import Button, { Button$ } from '../../Button';
import * as Button from '../../buttons';
import { Select } from '../../';

function ReportPage() {
	return (<>
		<ControlBar$>
			<div />
			<Button.Button
				styleAs={ Button.ControlBar$ }
				onClick={ e => console.log(e.target) } >
				Run
			</Button.Button>
		</ControlBar$>
		<Form$$>

			<div className='columns-container'>
				<div className='column'>

					<Select label='Type' name='type'>
						<option value=""> -none- </option>
						<option value="incidents"> Incident </option>
						<option value="requests"> Request </option>
						<option value="changes"> Change </option>
					</Select>

				</div>
			</div>
		</Form$$>
	</>);
}

export default ReportPage;

const Form$$ = styled(Form$)`
	flex-grow: 1;
`;