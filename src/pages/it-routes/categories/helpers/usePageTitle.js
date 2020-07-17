import { useParams } from 'react-router-dom';

const usePageTitle = () => {
	const params = useParams();
	const { type } = params;

	const dictionary = {
		'incidents': 'Incident categories',
		'requests': 'Request categories',
		'changes': 'Change categories'
	};
	return dictionary[ type ];
};


export default usePageTitle;