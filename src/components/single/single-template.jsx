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

	getElement() {
		const index = findIndex(this.props.content, value => value.slug === this.props.slug);

		if (-1 === index) {
			return (<Redirect to={this.props.home} />);
		} else {
			this.element = this.props.content[index];
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.slug !== this.props.slug) {
			this.getElement();
			this.props.fetchData(this.props.postType, this.element['json_file']);
		}
	}

	componentDidMount() {
		this.getElement();
		this.props.fetchData(this.props.postType, this.element['json_file']);
	}


	render() {
		window.scrollTo(0, 0);

		if (isEmpty(this.props.state['file']) || isEmpty(this.element)) {
			return null;
		}

		return (
			<article className={this.props.postClass}>
				<Signature element={this.element} data={this.props['state']['file']} />
				<Summary element={this.element} data={this.props['state']['file']} />
				<Source {...this.props} element={this.element} slug={this.props.slug} />
				<Content element={this.element} data={this.props['state']['file']} />
				<Changelog element={this.element} data={this.props['state']['file']} />
				<Methods element={this.element} data={this.props['state']['file']} home={this.props.home} />
				<Related element={this.element} data={this.props['state']['file']} home={this.props.home} />
			</article>
		);
	}
}