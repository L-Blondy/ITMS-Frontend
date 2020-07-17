const withRemove = (TargetClass) => class extends TargetClass {

	remove(index) {
		const { items } = this.state;

		this.setState({
			items: [ ...items.slice(0, index), ...items.slice(index + 1) ]
		});
	}
};

export default withRemove;