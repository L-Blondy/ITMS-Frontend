import { functionName, toQueryString } from './';

class Http {

	constructor() {
		this.req = new XMLHttpRequest();
		this.isSent = false;
		this.thenCBs = [];
		this.catchCB = () => { };
		this.thenCbResult = null;
		this.query = '';
		this.params = '';
	}

	_setupRequest(method, URL, params = '') {
		this.method = method;
		this._setQuery(params);
		this._setParams(params);
		this.req.open(method, URL + this.query, true);
		this.req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		this.req.setRequestHeader('Cache-Control', 'no-cache');
		this.req.msCaching = 'disabled';
		this.req.onreadystatechange = this._handleReadyStateChange.bind(this);
		return this;
	}

	_handleReadyStateChange() {
		if (this.req.readyState === 4 && (this.req.status === 0 || this.req.status >= 400)) {
			this.catchCB({
				status: this.req.status,
				message: this.req.responseText
			});
		}
		else if (this.req.readyState === 4) {
			this.thenCbResult = this.req.response;
			if (this.thenCBs.length);
			try {
				this.thenCBs.forEach(cb => {
					this.thenCbResult = cb(JSON.parse(this.thenCbResult));
				});
			}
			catch (e) {
				this.thenCBs.forEach(cb => {
					this.thenCbResult = cb(this.thenCbResult);
				});
			}
		}
	}

	_setQuery(params) {
		if (this.method === 'GET') {
			this.query = typeof params === 'string' ? params : toQueryString(params);
			if (this.query[ 0 ] && this.query[ 0 ] !== '?')
				this.query = '?' + this.query;
		}
	}

	_setParams(params) {
		this.params = params;


		if (this.method !== 'GET') {
			const isFormdata = typeof params.constructor === 'function' && functionName(params.constructor) === 'FormData';
			if (!isFormdata)
				this.params = toQueryString(params);
		}
	}

	get(URL, params) {
		this._setupRequest('GET', URL, params);
		return this;
	}

	post(URL, params) {
		this._setupRequest('POST', URL, params);
		return this;
	}

	delete(URL, params) {
		this._setupRequest('DELETE', URL, params);
		return this;
	}

	set(header, value) {
		this.req.setRequestHeader(header, value);
		return this;
	}

	send() {
		if (this.params && typeof this.params === 'string') {
			this.set('Content-type', 'application/x-www-form-urlencoded');
		}
		this.req.send(this.params);
		return this;
	}

	then(cb) {
		this.thenCBs = [ ...this.thenCBs, cb ];
		if (this.req.readyState === 1 && !this.isSent) {
			this.send();
			this.isSent = true;
		}
		return this;
	}

	catch(cb) {
		this.catchCB = cb;
		return this;
	}
}

export default (() => new Http());

// const http = () => {
// 	const instance = {
// 		request(method, URL, params = '') {
// 			this.method = method;
// 			this._setQuery();
// 			this._setParams();
// 			this.isSent = false;
// 			this.thenCBs = [];
// 			this.catchCB = () => { };
// 			this.cbResult = null;
// 			this.req = new XMLHttpRequest();
// 			this.req.open(method, URL + this.query, true);
// 			this.req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
// 			this.req.setRequestHeader('Cache-Control', 'no-cache');
// 			this.req.msCaching = 'disabled';
// 			this.req.onreadystatechange = this._handleReadyStateChange.bind(this);
// 			return this;
// 		},

// 		_handleReadyStateChange() {
// 			if (this.req.readyState === 4 && (this.req.status === 0 || this.req.status >= 400)) {
// 				this.catchCB({
// 					status: this.req.status,
// 					message: this.req.responseText
// 				});
// 			}
// 			else if (this.req.readyState === 4) {
// 				this.cbResult = this.req.response;
// 				if (this.thenCBs.length);
// 				try {
// 					this.thenCBs.forEach(cb => {
// 						this.cbResult = cb(JSON.parse(this.cbResult));
// 					});
// 				}
// 				catch (e) {
// 					this.thenCBs.forEach(cb => {
// 						this.cbResult = cb(this.cbResult);
// 					});
// 				}
// 			}
// 		},

// 		_setQuery(params) {
// 			this.query = '';
// 			if (this.method === 'GET') {
// 				this.query = typeof params === 'string' ? params : toQueryString(params);
// 				if (this.query[ 0 ] && this.query[ 0 ] !== '?')
// 					this.query = '?' + this.query;
// 			}
// 		},

// 		_setParams(params) {
// 			this.params = params;


// 			if (this.method !== 'GET') {
// 				const isFormdata = typeof params.constructor === 'function' && functionName(params.constructor) === 'FormData';
// 				if (!isFormdata)
// 					this.params = toQueryString(params);
// 			}
// 		},

// 		get(URL, params) {
// 			this.request('GET', URL, params);
// 			return this;
// 		},

// 		post(URL, params) {
// 			this.request('POST', URL, params);
// 			return this;
// 		},

// 		delete(URL, params) {
// 			this.request('DELETE', URL, params);
// 			return this;
// 		},

// 		set(header, value) {
// 			this.req.setRequestHeader(header, value);
// 			return this;
// 		},

// 		send() {
// 			if (this.params && typeof this.params === 'string') {
// 				this.set('Content-type', 'application/x-www-form-urlencoded');
// 			}
// 			this.req.send(this.params);
// 			return this;
// 		},

// 		then(cb) {
// 			this.thenCBs = [ ...this.thenCBs, cb ];
// 			if (this.req.readyState === 1 && !this.isSent) {
// 				this.send();
// 				this.isSent = true;
// 			}
// 			return this;
// 		},

// 		catch(cb) {
// 			this.catchCB = cb;
// 			return this;
// 		},
// 	};

// 	Object.defineProperties(instance, {,
// 		_handleReadyStateChange: {
// 			value: instance._handleReadyStateChange,
// 			enumerable: false
// 		},
// 		_setQuery: {
// 			value: instance._setQuery,
// 			enumerable: false
// 		},
// 		_setParams: {
// 			value: instance._setParams,
// 			enumerable: false
// 		},
// 	});

// 	return instance;
// };

// export default http;

// console.log(http());
