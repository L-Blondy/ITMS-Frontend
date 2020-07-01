import React from 'react';
import { FlexRow$ } from '../../../components/flex';
import { InputContainerFullWidth$ } from '../../../components/containers';
import { Button, ButtonControlBar$ } from '../../../components/buttons';



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
					{ 'Add "OR" clause' }
				</Button>
			</FlexRow$>
		</InputContainerFullWidth$>
	);
}

export default FilterConditions;
