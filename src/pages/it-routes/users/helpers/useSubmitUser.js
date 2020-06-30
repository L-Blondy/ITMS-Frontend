import { useContext } from 'react';
import { BASE_URL } from '/BASE_URL';
import { http } from '../../../../utils';
import { useHistory } from 'react-router-dom';
import { ItRoutesCtx } from '../../../it-routes/ItRoutesContext';
import { UserCtx } from '../../../../GlobalContext';

function useSubmitUser(state, setIsLoading) {

	const itRoutesCtx = useContext(ItRoutesCtx);
	const userCtx = useContext(UserCtx);
	const history = useHistory();

	return function () {
		setIsLoading(true);

		const newUserData = {
			...state,
			createdOn: Date.now(),
			createdBy: userCtx.name
		};

		setTimeout(() => {
			http()
				.post(BASE_URL + location.pathname, newUserData)
				.then(res => {
					const { id } = res;
					const nextPathname = location.pathname.split('/').slice(0, -1).join('/') + '/' + id;
					history.push(nextPathname);
				})
				.catch(err => {
					console.error(err);
					setIsLoading(false);
				});
		}, 300);
	};
}

export default useSubmitUser;
