import { XHR } from '../';
import { BASE_URL } from '/BASE_URL';
import { http } from '../../../utils';

function useDelete(selectedFiles, setSelectedFiles, setKey, setRequestStatus) {
	return function deleteFiles() {
		setRequestStatus({ state: XHR.LOADING });

		http()
			.delete(BASE_URL + location.pathname + '/delete', { toDelete: selectedFiles })
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
