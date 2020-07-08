import { BASE_URL } from '/BASE_URL';
import { http } from '../../../../utils';
import { useHistory } from 'react-router-dom';

function useDeleteTicket(setNeedToSave, setIsLoading) {

	const history = useHistory();

	return function deleteTicket() {
		setIsLoading(true);
		setNeedToSave(false);

		http()
			.delete(BASE_URL + location.pathname, '')
			.then(res => {
				if (!res.deletedCount) console.error('Could not delete the ticket');
				const redirectURL = location.pathname.split('/').slice(0, -1).join('/');
				setIsLoading(false);
				history.replace(redirectURL);
			})
			.catch(err => {
				console.log(err);
				setIsLoading(false);
			});
	};
}

export default useDeleteTicket;
