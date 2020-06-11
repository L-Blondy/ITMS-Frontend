import { XHR } from '../';
import { BASE_URL } from '/BASE_URL';
import { http } from '../../../utils';
import { useHistory } from 'react-router-dom';

function useSubmitTicket(setNeedToSave, itRoutesCtx, userCtx, state) {

	const history = useHistory();

	return function submitTicket(e) {
		setNeedToSave(false);
		const additionalData = JSON.parse(e.target.value || '{}');
		additionalData.user = userCtx.name;
		additionalData.date = Date.now();
		additionalData.updatedOn = Date.now();
		itRoutesCtx.page.setIsLoading(true);

		setTimeout(() => {
			http()
				.post(BASE_URL + location.pathname, { ...state, ...additionalData })
				.then(() => history.push(location.pathname.split('/').slice(0, -1).join('/') + `/${ state.id }`))
				.catch(err => {
					console.log(err);
					itRoutesCtx.page.setIsLoading(false);
				});
		}, 200);
	};
}

function submitTicket(e) {
	setNeedToSave(false);
	const additionalData = JSON.parse(e.target.value || '{}');
	additionalData.user = userCtx.name;
	additionalData.date = Date.now();
	additionalData.updatedOn = Date.now();
	itRoutesCtx.page.setIsLoading(true);

	setTimeout(() => {
		http()
			.post(BASE_URL + location.pathname, { ...state, ...additionalData })
			.then(() => history.push(location.pathname.split('/').slice(0, -1).join('/') + `/${ state.id }`))
			.catch(err => {
				console.log(err);
				itRoutesCtx.page.setIsLoading(false);
			});
	}, 200);
};

export default submitTicket;
