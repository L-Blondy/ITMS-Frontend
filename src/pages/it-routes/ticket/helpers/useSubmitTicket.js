import { useContext } from 'react';
import { BASE_URL } from '/BASE_URL';
import { http } from '../../../../utils';
import { useHistory, Redirect } from 'react-router-dom';
import { UserCtx } from '../../../../GlobalContext';

function useSubmitTicket(setNeedToSave, state, setIsLoading) {

	const history = useHistory();
	const userCtx = useContext(UserCtx);

	return function submitTicket(source) {
		setNeedToSave(false);
		const additionalData = JSON.parse(source.value || '{}');
		additionalData.user = userCtx.name;
		additionalData.date = Date.now();
		setIsLoading(true);

		setTimeout(() => {
			http()
				.post(BASE_URL + location.pathname, { ...state, ...additionalData })
				.then(() => {
					setIsLoading(false);
					history.replace(location.pathname.split('/').slice(0, -1).join('/') + `/${ state.id }`);
				})
				.catch(err => {
					console.log(err);
					setIsLoading(false);
				});
		}, 300);
	};
}

export default useSubmitTicket;
