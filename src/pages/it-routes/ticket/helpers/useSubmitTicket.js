import { useContext } from 'react';
import { BASE_URL } from '/BASE_URL';
import { http } from '../../../../utils';
import { useHistory } from 'react-router-dom';
import { ItRoutesCtx } from '../../ItRoutesContext';
import { UserCtx } from '../../../../GlobalContext';

function useSubmitTicket(setNeedToSave, state) {

	const history = useHistory();
	const itRoutesCtx = useContext(ItRoutesCtx);
	const userCtx = useContext(UserCtx);

	return function submitTicket(source) {
		setNeedToSave(false);
		const additionalData = JSON.parse(source.value || '{}');
		additionalData.user = userCtx.name;
		additionalData.date = Date.now();
		itRoutesCtx.page.setIsLoading(true);

		setTimeout(() => {
			http()
				.post(BASE_URL + location.pathname, { ...state, ...additionalData })
				.then(() => {
					itRoutesCtx.page.setIsLoading(false);
					history.push(location.pathname.split('/').slice(0, -1).join('/') + `/${ state.id }`);
				})
				.catch(err => {
					console.log(err);
					itRoutesCtx.page.setIsLoading(false);
				});
		}, 200);
	};
}

export default useSubmitTicket;
