import styled from 'styled-components';
import React from 'react';
import { Settings } from '../popup';
import { ItNavbar, ItSidebar } from '../navs';
import { FlexRow$, FlexCol$ } from '../flex';
import { useToggle } from '../../hooks';

function ItLayout({ children }) {

	const [ areSettingsOpened, toggleSettings ] = useToggle();

	return (<>
		<Settings
			when={ areSettingsOpened }
			close={ toggleSettings }
		/>

		<ColViewport$ >
			<ItNavbar toggleSettings={ toggleSettings } />

			<FlexRow$$>

				<ItSidebar />

				{ children }

			</FlexRow$$>
		</ColViewport$>
	</>);
}

export default ItLayout;

const ColViewport$ = styled(FlexCol$)`
	height: 100%;
`;

const FlexRow$$ = styled(FlexRow$)`
	height: calc(100% - 80px);
	width: 100vw;
	max-width: 100vw;
`;
