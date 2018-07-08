import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { isEmpty } from 'lodash';

import ArchiveTemplate from "./archive/archive-template.jsx";
import HomeTemplate from "./home/home-template.jsx";
import SingleTemplate from "./single/single-template.jsx";

import { getPostClass } from "../data/post-type-data";

export default class TemplateLoader extends Component {
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
			return null;
		}

		let content = this.props['state'][this.props.postType]['content'];
		if (!content.length || !this.props.type.length) {
			return (<Redirect to={this.props.home} />);
		}

		content = content.sort(function(a, b) {
			var textA = a.title.toUpperCase();
			var textB = b.title.toUpperCase();
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		});

		if ('home' === this.props.type) {
			return (<HomeTemplate {...this.props} content={content} />);
		}

		const postClass = getPostClass(this.props.postType);

		if ('archive' === this.props.type) {
			return (
				<ArchiveTemplate {...this.props}
					content={content}
					postClass={postClass}
				/>
			);
		}

		if ('single' === this.props.type) {
			return (
				<SingleTemplate {...this.props}
					content={content}
					postClass={postClass}
				/>
			);
		}

		return (<Redirect to={this.props.home} />);
	}
};