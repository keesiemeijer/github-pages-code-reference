import React from "react";
import { Redirect } from "react-router-dom";

import { findIndex, isEmpty } from "lodash";
import Signature from "../../templates/signature";
import Summary from "../../templates/summary";
import Content from "../../templates/content";
import Source from "../../templates/source";
import Related from "../../templates/related";
import Changelog from "../../templates/changelog";
import Methods from "../../templates/methods";

export default class SingleTemplate extends React.Component {
	constructor(props) {
		super(props);

		this.element = {};
		this.failedRequest = false;
	}

	getPostData() {
		const index = findIndex(this.props.content, value => value.slug === this.props.slug);
		if (-1 === index) {
			this.failedRequest = true;
		} else {
			this.failedRequest = false;
			this.element = this.props.content[index];
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.slug !== this.props.slug) {
			this.getPostData();
			this.props.fetchData(this.props.postType, this.element['json_file']);
		}
	}

	componentDidMount() {
		this.getPostData();
		this.props.fetchData(this.props.postType, this.element['json_file']);
	}

	render() {
		if (isEmpty(this.props.postTypeData['file']) || isEmpty(this.element)) {
			if (this.failedRequest) {
				return (<Redirect to={this.props.home} />);
			}
			return null;
		}

		const data = this.props['postTypeData']['file'];

		return (
			<article className={this.props.postClass}>
				<Signature element={this.element} data={data} />
				<Summary element={this.element} data={data} />
				<Source {...this.props} element={this.element} slug={this.props.slug} />
				<Content element={this.element} data={data} />
				<Changelog element={this.element} data={data} />
				<Methods element={this.element} data={data} home={this.props.home} />
				<Related element={this.element} data={data} home={this.props.home} />
			</article>
		);
	}
}