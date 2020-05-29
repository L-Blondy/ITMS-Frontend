import styled from 'styled-components';
import React from 'react';
import { ControlBar$$, Form$ } from '../';
import { Button, ButtonControlBar$ } from '../../buttons';
import { Select, InputAbsolute$ } from '../../inputs';

function ReportPage() {
	return (<>
		<ControlBar$$>
			<div />
			<Button
				styleAs={ ButtonControlBar$ }
				onClick={ e => console.log(e.target) } >
				Run
			</Button>
		</ControlBar$$>
		<Form$$>

			<div className='columns-container'>
				<div className='column'>

					<Select styleAs={ InputAbsolute$ } label='Type' name='type'>
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