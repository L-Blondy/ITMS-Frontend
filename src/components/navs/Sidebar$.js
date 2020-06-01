import styled from 'styled-components';

const Sidebar$ = styled.nav`
	height: 100%;
	width: 200px;
	flex-shrink: 0;

	ul {
		height: 100%;
		width: 200px;
		padding-top: 0.2rem;
		background: #3e4449;
		display: flex;
		flex-direction: column;
	}
	
	li {
		display: flex;
	}

	a {
		padding: 0.5rem;
		padding-left: 1rem;
		border-bottom: 1px solid #00000030; 
		flex-basis: 100%;
	}
`;

export default Sidebar$