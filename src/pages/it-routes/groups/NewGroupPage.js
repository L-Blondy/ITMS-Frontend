import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { FlexCol$ } from '#/components/flex';
import { Button, ButtonPrimary$ } from '#/components/buttons';
import { NewGroupStages, NewGroupName, NewGroupRoles, NewGroupUsers } from './';
import { withInitialFetch } from '#/higher-order';
import { ItPageContainer$$ } from '#/components/containers';

function NewGroupPage({ initialData }) {
	const [ stage, setStage ] = useState(3);
	const [ name, setName ] = useState('');
	const [ roles, setRoles ] = useState([]);
	const [ users, setUsers ] = useState([]);

	const isNextAllowed = () => {
		if (stage === 1) {
			return name.length ? false : true;
		}
		if (stage === 2) {
			return roles.length ? false : true;
		}
		if (stage === 3) {
			return users.length ? false : true;
		}
	};

	const handleNextStage = (e) => {
		e.preventDefault();
		setStage(stage + 1);
	};

	useEffect(() => {
		console.log(name, roles, users);
	}, [ name, roles, users ]);

	return (
		<ItPageContainer$$$>

			<NewGroupStages stage={ stage } setStage={ setStage } />

			<Form$ as='form' onSubmit={ handleNextStage }>
				<NewGroupName
					when={ stage === 1 }
					name={ name }
					setName={ setName }
				/>
				<NewGroupRoles
					when={ stage === 2 }
					roles={ roles }
					setRoles={ setRoles }
					initialOptions={ initialData.roles }
				/>
				<NewGroupUsers
					when={ stage === 3 }
					users={ users }
					setUsers={ setUsers }
				/>

				<Button
					className='next'
					styleAs={ ButtonPrimary$$ }
					disabled={ isNextAllowed() }>
					Next
				</Button>
			</Form$>

		</ItPageContainer$$$>
	);
}

export default withInitialFetch(NewGroupPage);

const ItPageContainer$$$ = styled(ItPageContainer$$)`
	height: 100%;
	margin: 4rem;
	align-items: flex-start;
`;

const Form$ = styled(FlexCol$)`
	align-items: flex-start;
	margin-top: 2rem;

	.next {
		margin-top: 2rem;
	}

	input, .select {
		width: 230px;
	}

`;

const ButtonPrimary$$ = styled(ButtonPrimary$)`
	padding: 0.2em 1.4em;
`;



