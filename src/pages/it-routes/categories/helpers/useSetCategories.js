function useSetCategories(state, setState, selectedCategory) {

	const setCategories = (categories) => {
		const nextState = categories.reduce((result, cat) => {
			result[ cat ] = [ ...state[ cat ] || [] ];
			return result;
		}, {});
		setState(nextState);
	};

	const setSubCategories = (subCategories) => {
		setState({
			...state,
			[ selectedCategory[ 0 ] ]: subCategories
		});
	};

	return [ setCategories, setSubCategories ];
}

export default useSetCategories;
