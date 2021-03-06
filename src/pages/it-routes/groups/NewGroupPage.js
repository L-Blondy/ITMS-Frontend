import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { FlexCol$ } from '#/components/flex';
import { Button, ButtonPrimary$ } from '#/components/buttons';
import { NewGroupPageProcessStages, NewGroupPageSetGroupName, NewGroupPageSetGroupRoles, NewGroupPageSetGroupMembers } from './';
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

			<NewGroupPageProcessStages stage={ stage } setStage={ setStage } />

			<FlexCol$$>
				<NewGroupPageSetGroupName
					when={ stage === 1 }
					name={ name }
					setName={ setName }
				/>
				<NewGroupPageSetGroupRoles
					when={ stage === 2 }
					roles={ roles }
					setRoles={ setRoles }
					initialOptions={ initialData.roles }
				/>
				<NewGroupPageSetGroupMembers
					when={ stage === 3 }
					users={ users }
					setUsers={ setUsers }
				/>

				<Button
					className='next'
					styleAs={ ButtonPrimary$$ }
					disabled={ isNextAllowed() }
					type='submit'
					onClick={ handleNextStage }>
					Next
				</Button>

			</FlexCol$$>

		</ItPageContainer$$$>
	);
}

export default withInitialFetch(NewGroupPage);

const ItPageContainer$$$ = styled(ItPageContainer$$)`
	height: 100%;
	margin: 4rem;
	align-items: flex-start;
`;

const FlexCol$$ = styled(FlexCol$)`
	align-items: flex-start;
	margin-top: 2rem;

	.next {
		margin-top: 2rem;
	}

	input#name, .select-roles {
		width: 230px;
	}

`;

const ButtonPrimary$$ = styled(ButtonPrimary$)`
	padding: 0.2em 1.4em;
`;



