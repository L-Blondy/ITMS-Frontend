import { http } from '../../../utils';
import { BASE_URL } from '/BASE_URL';

function useLogin(state) {
	return function () {
		console.log('login, state:', state);

		http()
			.post(BASE_URL + location.pathname, state)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};
}

export default useLogin;
