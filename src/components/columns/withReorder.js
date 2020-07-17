const withReorder = (TargetClass) => class extends TargetClass {

	moveUp(index) {
		if (!index) return;
		const itemsCopy = [ ...this.state.items ];

		[ itemsCopy[ index ], itemsCopy[ index - 1 ] ] = [ itemsCopy[ index - 1 ], itemsCopy[ index ] ];
		this.setState({ items: itemsCopy });
	}

	moveDown(index) {
		if (index === this.state.items.length - 1) return;
		const itemsCopy = [ ...this.state.items ];

		[ itemsCopy[ index ], itemsCopy[ index + 1 ] ] = [ itemsCopy[ index + 1 ], itemsCopy[ index ] ];
		this.setState({ items: itemsCopy });
	}
};

export default withReorder;