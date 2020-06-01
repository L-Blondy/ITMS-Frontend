import React from 'react'

function Nav ( { styleAs: NavStyled = 'nav', ...props } ) {
	return (
		<NavStyled { ...props } />

	)
}

export default Nav
