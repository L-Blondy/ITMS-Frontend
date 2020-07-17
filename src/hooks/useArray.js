function useArray(items, setItems) {
	const add = (item) => {
		item && setItems([ ...new Set([ ...items, item ]) ]);
	};

	const remove = (index) => {
		setItems([ ...items.slice(0, index), ...items.slice(index + 1) ]);
	};

	const moveUp = (index) => {
		if (!index) return;
		const itemsCopy = [ ...items ];

		[ itemsCopy[ index ], itemsCopy[ index - 1 ] ] = [ itemsCopy[ index - 1 ], itemsCopy[ index ] ];
		setItems(itemsCopy);
	};

	const moveDown = (index) => {
		if (index === items.length - 1) return;
		const itemsCopy = [ ...items ];

		[ itemsCopy[ index ], itemsCopy[ index + 1 ] ] = [ itemsCopy[ index + 1 ], itemsCopy[ index ] ];
		setItems(itemsCopy);
	};

	return { add, remove, moveUp, moveDown };
}

export default useArray;
