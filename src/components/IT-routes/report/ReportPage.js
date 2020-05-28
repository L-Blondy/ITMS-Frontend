import styled from 'styled-components';
import React from 'react';
import { ControlBar$, Form$ } from '../';
import Button, { Button$ } from '../../Button';

function ReportPage() {
	return (<>
		<ControlBar$>
			<Button
				Render$={ Button$ }
				onClick={ e => console.log(e.target) } >
				Run
			</Button>
		</ControlBar$>
		<Form$$>

			<div className='columns-container'>
				<div className='column'>

					<label className='label'>
						<span>Type</span>
						<select id='urgency' name='urgency' onChange={ e => '' } value={ '' } >
							<option value="1"> 1 - Critical </option>
							<option value="2"> 2 - High </option>
							<option value="3"> 3 - Medium </option>
							<option value="4"> 4 - Non critical </option>
						</select>
					</label>

				</div>
			</div>
		</Form$$>
	</>);
}

export default ReportPage;


const Form$$ = styled(Form$)`
	flex-grow: 1;
`;

function Select({ label, name, onChange, value, children }) {
	return (
		<label className='label'>
			<span>{ label }</span>
			<select id={ name } name={ name } onChange={ onChange } value={ value } >
				{ children }
			</select>
		</label>
	);
}