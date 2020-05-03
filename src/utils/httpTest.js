import http from './http';

http()
	.get('http://localhost:3000/ticket/new?type=INC')
	.set('Content-type', 'application/x-www-form-urlencoded')
	.then(res => console.log(res))
	.catch(error => console.log(error));
