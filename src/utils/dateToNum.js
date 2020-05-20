export default function dateToNum(date) {
	date = date.split('/');
	[ date[ 0 ], date[ 1 ] ] = [ date[ 1 ], date[ 0 ] ];
	date = date.join('/');
	const num = new Date(date).getTime();
	return num;
}