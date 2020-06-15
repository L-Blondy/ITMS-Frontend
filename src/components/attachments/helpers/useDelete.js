import { XHR } from '../';
import { useContext } from 'react';
import { BASE_URL } from '/BASE_URL';
import { http } from '../../../utils';
import { UserCtx } from '../../../GlobalContext';

function useDelete(selectedFiles, setSelectedFiles, setKey, setRequestStatus) {

	const userCtx = useContext(UserCtx);

	return function deleteFiles() {
		setRequestStatus({ state: XHR.LOADING });

		const data = {
			toDelete: selectedFiles,
			date: Date.now(),
			user: userCtx.name
		};

		http()
			.delete(BASE_URL + location.pathname + '/delete', data)
			.then(() => {
				setRequestStatus({
					state: XHR.SUCCESS,
					files: selectedFiles,
					message: ` ${ selectedFiles.length > 1 ? 'were' : 'was' } removed with success.`
				});
				setKey(Math.random());
				setSelectedFiles([]);
			})
			.catch(e => {
				setRequestStatus({
					state: XHR.ERROR,
					files: selectedFiles,
					message: '  could not be removed, please try again.'
				});
			});
	};
}

export default useDelete;
