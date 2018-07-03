import React, { Component } from "react";

import { isEmpty } from 'lodash';

import PrimaryTemplate from "../primary-template";
import HomeContent from "../../templates/home-content";
import LoadComponent from "../load-component";


export default class HomeTemplate extends Component {
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.postType !== this.props.postType) {
			if (isEmpty(this.props.state[this.props.postType])) {
				this.props.fetchData(this.props.postType);
			}
		}
	}

	componentDidMount() {
		if (isEmpty(this.props.state[this.props.postType])) {
			this.props.fetchData(this.props.postType);
		}
	}

	render() {
		if (isEmpty(this.props.state[this.props.postType])) {
			return (<LoadComponent />);
		}

		return (
			<PrimaryTemplate {...this.props} isHome={true}>
				<HomeContent {...this.props} />
			</PrimaryTemplate>
		);
	}
};