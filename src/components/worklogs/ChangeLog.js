import styled from 'styled-components';
import React from 'react';
import { TruncatedText } from '#/components/text';
import { CLR } from '#/GlobalStyles';

function ChangeLog({ children: log, ...props }) {

	const logParts = log.split('§§').filter(part => part);
	return (
		<div { ...props }>
			{ logParts.map((part, i) => {
				if (i % 6 === 0)
					return <ChangedProp$ key={ part + i }>{ part + ' :' }</ChangedProp$>;
				if (i % 2 === 0) {
					return <TruncatedText limit={ 25 } key={ part + i }>{ part }</TruncatedText>;
				}
				else
					return <Divisor$ key={ part + i }>{ part }</Divisor$>;
			}) }
		</div>
	);
}

export default ChangeLog;

const ChangedProp$ = styled.span`
	display: inline-block;
	text-align: right;
	min-width: 150px;
	margin-left: 2vw;
	margin-right: 0.6rem;
	text-transform: capitalize;
	line-height: 2rem;
	flex-shrink: 0;
`;

const Divisor$ = styled.i`
	color: ${ CLR.FONT.LIGHT };
	margin: 0 0.3rem;
`;