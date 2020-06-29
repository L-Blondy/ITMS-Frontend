import { useContext } from 'react';
import { BASE_URL } from '/BASE_URL';
import { http } from '../../../../utils';
import { useHistory } from 'react-router-dom';
import { ItRoutesCtx } from '../../ItRoutesContext';

function useDeleteTicket(setNeedToSave) {

	const history = useHistory();
	const itRoutesCtx = useContext(ItRoutesCtx);

	return function deleteTicket(e) {
		itRoutesCtx.page.setIsLoading(true);
		setNeedToSave(false);

		http()
			.delete(BASE_URL + location.pathname, '')
			.then(res => {
				if (!res.deletedCount) console.error('Could not delete the ticket');
				const redirectURL = location.pathname.split('/').slice(0, -1).join('/');
				itRoutesCtx.page.setIsLoading(false);
				history.push(redirectURL);
			})
			.catch(err => {
				console.log(err);
				itRoutesCtx.page.setIsLoading(false);
			});
	};
}

export default useDeleteTicket;
