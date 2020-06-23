import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { FlexRow$, FlexCol$ } from '../../../components/flex';
import { SelectNew } from '../../../components/inputs';

function GroupsPage({ initialData: { groups } }) {

	return (<>
		<h1>
			Groups
		</h1>

		<a href={ `${ location.pathname }/new` }>
			Create new Group
		</a>

		<FlexCol$$>
			{ groups && groups.map(group => (
				<FlexRow$ key={ group.name }>
					<a href={ `${ location.pathname }/${ group.name }` }>
						{ group.name }
					</a>
					<FlexRow$>
						{ group.users.map(user => (
							<FlexRow$>{ user.name }</FlexRow$>
						)) }
					</FlexRow$>
				</FlexRow$>
			)) }
		</FlexCol$$>

		<SelectNew options={ [
			{ value: 'chocolate', label: 'Chocolate' },
			{ value: 'strawberry', label: 'Strawberry' },
			{ value: 'vanilla', label: 'Vanilla' },
		] } />
	</>);
}

export default GroupsPage;

const FlexCol$$ = styled(FlexCol$)`
	a {
		text-decoration: underline;
	}
`;

// function Select({
// 	children,
// 	styleAs: Span$ = 'span',
// 	label,
// 	name,
// 	className,
// 	defaultValue,
// 	errors = [],
// 	...props
// }) {
// 	const [ value, setValue ] = useState(defaultValue || '');
// 	const [ displayedValue, setDisplayedValue ] = useState('');
// 	const [ isOpen, setIsOpen ] = useState(false);

// 	useEffect(() => {
// 		const initialDisplayedValue = document.querySelector(`option[value="${ value }"]`).textContent;
// 		setDisplayedValue(initialDisplayedValue);

// 		window.addEventListener('click', handleClickOutside);

// 		return () => { };
// 	}, []);

// 	const handleChange = (e) => {
// 		console.log(e.target);
// 		setIsOpen(!isOpen);
// 		setValue(e.target.value);
// 		setDisplayedValue(e.target.textContent);
// 	};

// 	const handleClickOutside = (e) => {
// 		if (!'select'.isOneOf(Array.from(e.target.classList)))
// 			setIsOpen(false);
// 	};

// 	return (
// 		<Span$ className={ `labelled-input ${ className } ` }>
// 			<label htmlFor={ name }>
// 				{ label }
// 			</label>

// 			<select
// 				className={ errors.length ? 'invalid' : '' }
// 				name={ name }
// 				id={ name }
// 				value={ value }
// 				onChange={ handleChange }
// 				{ ...props }
// 				disabled>
// 				{ children }
// 			</select>

// 			<button className='select' onClick={ handleChange }>
// 				{ displayedValue }
// 				<div className='options-wrapper'>
// 					<div className={ `options ${ isOpen ? 'opened' : 'closed' }` } >
// 						{ children }
// 					</div>
// 				</div>
// 			</button>

// 			{ errors.length ? (
// 				<div className='errors'>
// 					{ errors.map((err, i) => (
// 						<div className='error' key={ name + value + i }>
// 							{ err }
// 						</div>
// 					)) }
// 				</div>
// 			) : null }
// 		</Span$>
// 	);
// }

