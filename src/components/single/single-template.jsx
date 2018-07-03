import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { findIndex, isEmpty } from "lodash";

import { getPostClass, getSlug } from "../../data/post-type-data";
import LoadComponent from "../load-component";
import PrimaryTemplate from "../primary-template";
import Signature from "../../templates/signature";
import Summary from "../../templates/summary";
import Content from "../../templates/content";
import Source from "../../templates/source";
import Related from "../../templates/related";
import Changelog from "../../templates/changelog";
import Methods from "../../templates/methods";

export default class SingleTemplate extends Component {

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
		window.scrollTo(0, 0);

		if (isEmpty(this.props.state[this.props.postType])) {
			return (<LoadComponent />);
		}

		let typeElements = this.props['state'][this.props.postType]['content'];
		if (!typeElements.length) {
			return (<Redirect to={this.props.home} />);
		}

		const route = this.props.location.pathname;
		const postTypeIndex = this.props.postTypeIndex;

		let slug = getSlug(route, postTypeIndex + 1);
		if ("methods" === this.props.postType) {
			slug += "::" + getSlug(route, postTypeIndex + 2);
		}
		const index = findIndex(typeElements, value => value.slug === slug);

		let element;
		if (-1 === index) {
			return (<Redirect to={this.props.home} />);
		} else {
			element = typeElements[index];
		}

		let postClass = getPostClass(this.props.postType);
		const data = require('../../json-files/files/' + element.json_file + '.json');

		return (
			<PrimaryTemplate {...this.props} >
			<article className={postClass}>
				<Signature element={element} data={data} />
				<Summary element={element} data={data} />
				<Source {...this.props} element={element} slug={slug} />
				<Content element={element} data={data} />
				<Changelog element={element} data={data} />
				<Methods element={element} data={data} home={this.props.home} />
				<Related element={element} data={data} home={this.props.home} />
			</article>
		</PrimaryTemplate>
		);
	}
};