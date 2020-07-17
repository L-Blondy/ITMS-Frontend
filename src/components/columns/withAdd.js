const withAdd = (TargetClass) => class extends TargetClass {
	add(item) {
		this.setState({
			items: [ ...this.state.items, item ]
		});
	}
};

export default withAdd;