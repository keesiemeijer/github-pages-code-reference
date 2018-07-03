import React, { Component } from "react"

import { Link, Redirect } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { getPostClass } from "../../data/post-type-data";
import LoadComponent from "../load-component";
import Strings from '../../json-files/wp-parser-json-strings.json';
import PrimaryTemplate from "../primary-template";

export default class ArchiveTemplate extends Component {

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

		let typeElements = this.props['state'][this.props.postType]['content'];

		if (!typeElements.length) {
			return (<Redirect to={this.props.home} />);
		}

		typeElements = typeElements.sort(function(a, b) {
			var textA = a.title.toUpperCase();
			var textB = b.title.toUpperCase();
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		});

		let postClass = getPostClass(this.props.postType);
		const postTypeHome = ('/' === this.props.home) ? '' : this.props.home;

		return (
			<PrimaryTemplate {...this.props}>
			<h2>{Strings[ this.props.postType ]}</h2>
			{typeElements.map( (item, index) =>
				<article key={index} className={postClass}>
				<h1><Link to={postTypeHome + '/' + this.props.postType + '/' + item.slug}>{item.title}</Link></h1>
				<div className="description" dangerouslySetInnerHTML={{ __html: item.summary}}></div>
				<div className="sourcefile"><p>{Strings['source_file'].replace( '%1$s', item.source_file )}</p></div>
				</article>
			)}
		</PrimaryTemplate>
		)
	}
}