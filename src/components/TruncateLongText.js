import styled from 'styled-components';
import React, { useState } from 'react';

function TruncateLongText({ limit = 20, children: text }) {
	const [ isExpanded, setIsExpanded ] = useState(false);

	if (text.length < limit)
		return <span>{ text }</span>;

	if (!isExpanded)
		return (<>
			<span>{ text.slice(0, limit) }...</span>
			<Button$ className='truncate-control' onClick={ () => setIsExpanded(true) }>show more</Button$>
		</>);

	else // isExpanded
		return (<>
			<span>{ text }</span>
			<Button$ className='truncate-control' onClick={ () => setIsExpanded(false) }>show less</Button$>
			<br />
			<br />
		</>);
}

export default TruncateLongText;

const Button$ = styled.button`
	background: none;
	color: #46c1e9;
	padding: 0 0.5em;
`;