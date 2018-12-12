import React from "react";
import { Redirect } from "react-router-dom";

import get from "lodash/get";
import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';

import {getLink} from '../data/selectors';

import Spinner from "./spinner.jsx";

import Signature from './template-parts/signature';
import Summary from './template-parts/summary';
import Content from './template-parts/content';
import Source from './template-parts/source';
import Related from './template-parts/related';
import Changelog from './template-parts/changelog';
import Methods from './template-parts/methods';
import Notice from './template-parts/notice';
import WithData from '../data/with-data.jsx';

export class SingleTemplate extends React.Component {
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
			import ('../json-files/files/' + file + '.json').then((data) => {
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
		const { postType, home } = this.props;


		if (isEmpty(this.state.file) || isEmpty(this.element)) {
			if (this.state.failedRequest) {
				return (<Redirect to={home} />);
			}

			return <Spinner />;
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
			methods = (<Methods element={this.element} data={data} home={home} />);
		}

		let archiveUrl = getLink( home, postType );
		if ('methods' === postType) {
			archiveUrl = '';
		}

		return (
			<article className={this.props.postClass}>
				<Notice element={this.element} data={data} />
				<Signature element={this.element} data={data} />
				<Summary element={this.element} data={data} />
				<Source  element={this.element} {...this.props} />
				<Content element={this.element} data={data} />
				<Changelog element={this.element}  data={data} archiveUrl={archiveUrl} />
		        {methods}
				<Related element={this.element} data={data} home={home} />
			</article>
		);
	}
}

export default WithData( SingleTemplate )