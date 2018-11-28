import React from "react"

export default class Spinner extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timePassed: false
		};

	}

	componentWillUnmount() {
		clearTimeout(this.timer);

	}

	componentDidMount() {
		this.timer = setTimeout(() => { this.setState({ timePassed: true }) }, 500)
	}


	render() {
		if (!this.state.timePassed) {
			return null;
		}
		return (<div className="loader">Loading...</div>);
	}
}