import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { usePost } from '../../hooks';
import { baseURL } from '../../../baseURL';
import { UserCtx } from '../../Context';
import http from '../../utils/http';

function UploadFile () {

	const location = useLocation();
	const input = useRef();
	const user = useContext( UserCtx );
	const [ res, post ] = usePost();

	const uploadFile = ( e ) => {
		e.preventDefault();
		const file = input.current.files[ 0 ];
		if ( !file )
			return;
		const formData = new FormData();
		formData.append( "file", file );
		formData.append( "user", user );

		http()
			.post( baseURL + location.pathname + '/attach', formData )
			.send()
			.catch( e => console.error( e ) );

		// const req = new XMLHttpRequest();
		// req.open( "POST", baseURL + location.pathname + '/attach', true );
		// req.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
		// req.setRequestHeader( 'Cache-Control', 'no-cache' );
		// req.msCaching = 'disabled';
		// req.send( formData );

		// axios
		// 	.post(baseURL + location.pathname + '/attach', formData)
		// 	.then(res => {
		// 		console.log('Post file responded successfully');
		// 	})
		// 	.catch(e => console.error(e.response.data));
	};

	return (
		<form
			method='POST'
			onSubmit={ uploadFile }
			encType='multipart/form-data'>

			<label htmlFor="file">Add file</label>
			<input id='file' name='file' ref={ input } type='file' />
			<button>Add</button>

		</form>
	);
}

export default UploadFile;

