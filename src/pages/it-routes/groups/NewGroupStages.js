import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { FlexRow$ } from '../../../components/flex';
import { Button, ButtonText$ } from '../../../components/buttons';
import { CLR } from '../../../GlobalStyles';
import { chevron2 } from '/assets/icons';

function NewGroupStages({ stage, setStage }) {

	const [ biggestVisitedStage, setBiggestVisitedStage ] = useState(1);

	useEffect(() => {
		stage > biggestVisitedStage && setBiggestVisitedStage(stage);
	}, [ stage ]);

	return (
		<FlexRow$$>
			<Button
				styleAs={ ButtonText$$ }
				value={ 1 }
				isActive$={ stage === 1 }
				onClick={ e => setStage(parseInt(e.target.value)) }>
				Group name
			</Button>
			<Chevron$ src={ chevron2 } alt='' />
			<Button
				styleAs={ ButtonText$$ }
				value={ 2 }
				isActive$={ stage === 2 }
				disabled={ biggestVisitedStage < 2 ? true : false }
				onClick={ e => setStage(parseInt(e.target.value)) }>
				Group roles
			</Button>
			<Chevron$ src={ chevron2 } alt='' />
			<Button
				styleAs={ ButtonText$$ }
				value={ 3 }
				isActive$={ stage === 3 }
				disabled={ biggestVisitedStage < 3 ? true : false }
				onClick={ e => setStage(parseInt(e.target.value)) }>
				Group members
			</Button>
		</FlexRow$$>
	);
}

export default NewGroupStages;

const FlexRow$$ = styled(FlexRow$)`
	align-items: center;
`;

const Chevron$ = styled.img`
	transform: rotate(90deg);
	height: 0.6rem;
	margin: 0.5em;
`;

const ButtonText$$ = styled(ButtonText$)`
	padding: 0;
	white-space: nowrap;
	font-size: 1.05rem;
	color: ${({ isActive$ }) => isActive$ ? CLR.PRIMARY_VIBRANT : '#757575' };
`;;