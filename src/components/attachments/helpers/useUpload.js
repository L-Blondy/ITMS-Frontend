import { XHR } from '../';
import { BASE_URL } from '/BASE_URL';
import { http } from '../../../utils';

function useUpload(username, setKey, setRequestStatus, file) {

	return function upload(file) {
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);
		formData.append("user", username);
		setRequestStatus({ state: XHR.LOADING });

		http()
			.post(BASE_URL + location.pathname + '/attach', formData)
			.then(() => {
				setRequestStatus({
					state: XHR.SUCCESS,
					files: [ file.name ],
					message: '  was uploaded with success'
				});
				setKey(Math.random());
			})
			.catch(e => {
				setRequestStatus({
					state: XHR.ERROR,
					files: [ file.name ],
					message: `  could not be uploaded.\n${ e.message }`
				});
				console.error(e);
			});
	};
}

export default useUpload;
