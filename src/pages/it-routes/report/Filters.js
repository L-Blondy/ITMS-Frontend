import styled from 'styled-components';
import React from 'react';
import { ControlBar$ } from '../../../components/navs';
import { FlexCol$, FlexRow$ } from '../../../components/flex';
import { InputContainer$, InputContainerFullWidth$ } from '../../../components/containers';
import { Button, ButtonControlBar$ } from '../../../components/buttons';
import { Select, InputLabelLeftAbs$ } from '../../../components/inputs';


function FilterConditions() {
	return (
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
	);
}

export default FilterConditions;
