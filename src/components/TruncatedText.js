import styled from 'styled-components';
import React, { useState } from 'react';
import { Button, ButtonText$ } from './buttons';

function TruncatedText({ limit = 25, children: text }) {
	const [ isExpanded, setIsExpanded ] = useState(false);

	if (text.length < limit)
		return <span>{ text }</span>;

	if (!isExpanded)
		return (<>
			<span>{ text.slice(0, limit) }...</span>
			<Button
				styleAs={ ButtonText$ }
				onClick={ () => setIsExpanded(true) }>
				show more
			</Button>
		</>);

	else // isExpanded
		return (<>
			<span>{ text }</span>
			<Button
				styleAs={ ButtonText$ }
				onClick={ () => setIsExpanded(false) }>
				show less
			</Button>

		</>);
}

export default TruncatedText;
