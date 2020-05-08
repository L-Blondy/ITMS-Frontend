import styled from 'styled-components';

const DisableBg$ = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1002;
	background: rgba(0,0,0,0.4);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default DisableBg$;