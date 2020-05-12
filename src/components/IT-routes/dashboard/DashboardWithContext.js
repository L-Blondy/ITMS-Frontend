import React, { useEffect } from 'react';

function DashboardWithContext() {

	useEffect(() => {
		console.log('MOUNT DASHBOARD');
		return () => console.log('UNMOUT DASHBOARD');
	}, []);

	return (
		<h1>Dashboard</h1>
	);
}

export default DashboardWithContext;

