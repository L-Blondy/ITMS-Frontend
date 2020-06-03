import styled from 'styled-components';
import React from 'react';
import { TruncatedText } from '../text';
import { CLR } from '../../GlobalStyles';

function ChangeLog({ children: log, when, ...props }) {
	if (!when) return null;

	const logParts = log.split('§§').filter(part => part);
	return (
		<div { ...props }>
			{ logParts.map((part, i) => {
				if (i % 6 === 0)
					return <Prop$ key={ part + i }>{ part + ' :' }</Prop$>;
				if (i % 2 === 0) {
					return <TruncatedText limit={ 25 } key={ part + i }>{ part }</TruncatedText>;
				}
				else
					return <I$ key={ part + i }>{ part }</I$>;
			}) }
		</div>
	);
}

export default ChangeLog;

const Prop$ = styled.span`
	display: inline-block;
	text-align: right;
	min-width: 150px;
	margin-left: 2vw;
	margin-right: 0.6rem;
	text-transform: capitalize;
	line-height: 2rem;
	flex-shrink: 0;
`;

const I$ = styled.i`
	color: ${ CLR.FONT.LIGHT };
	margin: 0 0.3rem;
`;