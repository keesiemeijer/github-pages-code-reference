import React from "react";
import { Redirect } from "react-router-dom";

import { findIndex, isEmpty, get } from "lodash";

import Signature from "../../templates/signature";
import Summary from "../../templates/summary";
import Content from "../../templates/content";
import Source from "../../templates/source";
import Related from "../../templates/related";
import Changelog from "../../templates/changelog";
import Methods from "../../templates/methods";
import Notice from "../../templates/notice";

export default class SingleTemplate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			file: {},
			failedRequest: false,
		}

		this.element = {};
	}

	failedRequest() {
		this.setState({
			failedRequest: true,
		});
	}

	getPostData() {
		const index = findIndex(this.props.content, value => value.slug === this.props.slug);
		if (-1 === index) {
			this.failedRequest();
		} else {
			this.element = this.props.content[index];
		}
	}

	getFileData(file) {
		try {
			import ('../../json-files/files/' + file + '.json').then((data) => {
				this.setState({
					file: data,
				});
			});
		} catch (error) {
			this.failedRequest();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.slug !== this.props.slug) {
			this.getPostData();
			this.getFileData(this.element['json_file']);
		}
	}

	componentDidMount() {
		this.getPostData();
		this.getFileData(this.element['json_file']);
	}

	render() {
		if (isEmpty(this.state.file) || isEmpty(this.element)) {
			if (this.state.failedRequest) {
				return (<Redirect to={this.props.home} />);
			}
			return null;
		}

		const slug = get(this.element, 'slug', '');
		const line_num = get(this.element, 'line_num', '');
		if (!slug.length || !line_num.length) {
			return null;
		}

		const data = get(this.state.file, slug + '-' + line_num, {});
		if (isEmpty(data)) {
			return null;
		}

		let methods = '';
		if ('classes' === this.props.postType) {
			methods = (<Methods element={this.element} data={data} home={this.props.home} />);
		}

		const home = ('/' === this.props.home) ? '' : this.props.home;
		let archive = home + '/' + this.props.postType;
		if ('methods' === this.props.postType) {
			archive = '';
		}

		return (
			<article className={this.props.postClass}>
				<Notice element={this.element} data={data} />
				<Signature element={this.element} data={data} />
				<Summary element={this.element} data={data} />
				<Source  element={this.element} {...this.props} />
				<Content element={this.element} data={data} />
				<Changelog element={this.element}  data={data} archiveUrl={archive} />
		        {methods}
				<Related element={this.element} data={data} home={home} />
			</article>
		);
	}
}