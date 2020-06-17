import { useContext } from 'react';
import { BASE_URL } from '/BASE_URL';
import { http } from '../../../../utils';
import { useHistory } from 'react-router-dom';
import { ItRoutesCtx } from '../../../it-routes/ItRoutesContext';
import { UserCtx } from '../../../../GlobalContext';

function useSubmitUser(state, groups) {

	const itRoutesCtx = useContext(ItRoutesCtx);
	const userCtx = useContext(UserCtx);
	const history = useHistory();

	return function () {
		itRoutesCtx.page.setIsLoading(true);
		const options = [].slice.call(groups.current.options);
		const selectedGroups = options.reduce((selectedGroups, opt) => {
			if (opt.selected) {
				selectedGroups.push(opt.value);
			}
			return selectedGroups;
		}, []);

		const newUserData = {
			...state,
			groups: selectedGroups,
			createdOn: Date.now(),
			createdBy: userCtx.name
		};

		setTimeout(() => {
			http()
				.post(BASE_URL + location.pathname, newUserData)
				.then(res => {
					const { id } = res.administrationData;
					const nextPathname = location.pathname.split('/').slice(0, -1).join('/') + '/' + id;
					history.push(nextPathname);
				})
				.catch(err => {
					console.error(err);
					itRoutesCtx.page.setIsLoading(false);
				});
		}, 300);
	};
}

export default useSubmitUser;
