import toQuery from './toQuery';

const http = () => ({

	get(URL, params) {
		const query = typeof params === 'string' ? params : toQuery(params);
		this.method = 'GET';
		this.thenCB = () => { };
		this.catchCB = () => { };
		this.req = new XMLHttpRequest();
		this.req.open(this.method, URL + query, true);
		this.req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		this.req.setRequestHeader('Cache-Control', 'no-cache');
		this.req.msCaching = 'disabled';
		this.query = null;

		this.req.onreadystatechange = (e) => {
			if (this.req.readyState === 4 && (this.req.status === 0 || this.req.status >= 400)) {
				this.catch(this.catchCB({
					status: this.req.status,
					message: this.req.responseText
				}));
			}
			else if (this.req.readyState === 4) {
				try {
					this.then(this.thenCB(JSON.parse(this.req.response)));
				}
				catch (e) {
					this.then(this.thenCB(this.req.response));
				}
			}
		};
		return this;
	},

	post(URL, params) {
		let query;
		if (!params) {
			query = '';
		}
		//if FormData (IE11 compatible)
		else if (typeof params.constructor === 'function' && functionName(params.constructor) === 'FormData') {
			query = params;
		}
		else {
			query = toQuery(params);
		}
		this.method = 'POST';
		this.thenCB = () => { };
		this.catchCB = () => { };
		this.req = new XMLHttpRequest();
		this.req.open(this.method, URL, true);
		this.req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		this.req.setRequestHeader('Cache-Control', 'no-cache');
		this.req.msCaching = 'disabled';
		this.query = query;

		this.req.onreadystatechange = (e) => {
			if (this.req.readyState === 4 && (this.req.status === 0 || this.req.status >= 400)) {
				this.catch(this.catchCB({
					status: this.req.status,
					message: this.req.responseText
				}));
			}
			else if (this.req.readyState === 4) {
				try {
					this.then(this.thenCB(JSON.parse(this.req.response)));
				}
				catch (e) {
					this.then(this.thenCB(this.req.response));
				}
			}
		};
		return this;
	},

	delete(URL, params) {
		let query;
		if (!params) {
			query = '';
		}
		//if FormData (IE11 compatible)
		else if (typeof params.constructor === 'function' && functionName(params.constructor) === 'FormData') {
			query = params;
		}
		else {
			query = toQuery(params);
		}
		this.method = 'DELETE';
		this.thenCB = () => { };
		this.catchCB = () => { };
		this.req = new XMLHttpRequest();
		this.req.open(this.method, URL, true);
		this.req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		this.req.setRequestHeader('Cache-Control', 'no-cache');
		this.req.msCaching = 'disabled';
		this.query = query;

		this.req.onreadystatechange = (e) => {
			if (this.req.readyState === 4 && (this.req.status === 0 || this.req.status >= 400)) {
				this.catch(this.catchCB({
					status: this.req.status,
					message: this.req.responseText
				}));
			}
			else if (this.req.readyState === 4) {
				try {
					this.then(this.thenCB(JSON.parse(this.req.response)));
				}
				catch (e) {
					this.then(this.thenCB(this.req.response));
				}
			}
		};
		return this;
	},

	set(header, value) {
		this.req.setRequestHeader(header, value);
		return this;
	},

	send() {
		if (typeof this.query === 'string' && this.method !== 'GET') {
			this.set('Content-type', 'application/x-www-form-urlencoded');
		}
		this.req.send(this.query);
		return this;
	},

	then(cb) {
		if (this.req.readyState === 1) {
			this.send();
			this.thenCB = cb;
		}
		return this;
	},

	catch(cb) {
		this.catchCB = cb;
		return this;
	},

	abort() {
		this.req.abort();
		return this;
	}
});

export default http;

function functionName(fun) {
	var ret = fun.toString();
	ret = ret.substr('function '.length);
	ret = ret.substr(0, ret.indexOf('('));
	return ret.trim();
}