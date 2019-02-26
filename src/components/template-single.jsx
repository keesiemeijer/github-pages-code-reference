import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import get from "lodash/get";
import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';

import { getLink } from '../data/selectors';

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

export function SingleTemplate(props) {
	const { postType, home, slug, content } = props;
	let fileData = {};

	const index = findIndex(content, value => value.slug === slug);
	const element = (-1 !== index) ? content[index] : {};
	const json_file = get(element, 'json_file', '');

	if (json_file.length) {
		fileData = useFileData(json_file);
	}

	if (isEmpty(fileData.data) || isEmpty(element)) {
		if (fileData.failedRequest) {
			return (<Redirect to={home} />);
		}

		return <Spinner />;
	}

	const elementSlug = get(element, 'slug', '');
	const line_num = get(element, 'line_num', '');
	if (!elementSlug.length || !line_num.length) {
		return null;
	}

	const data = get(fileData.data, elementSlug + '-' + line_num, {});
	if (isEmpty(data)) {
		return null;
	}

	let methods = '';
	if ('classes' === postType) {
		methods = (<Methods element={element} data={data} home={home} />);
	}

	let archiveUrl = getLink(home, postType);
	if ('methods' === postType) {
		archiveUrl = '';
	}

	return (
		<article className={props.postClass}>
				<Notice element={element} data={data} />
				<Signature element={element} data={data} />
				<Summary element={element} data={data} />
				<Source  element={element} {...props} />
				<Content element={element} data={data} />
				<Changelog element={element}  data={data} archiveUrl={archiveUrl} />
		        {methods}
				<Related element={element} data={data} home={home} />
			</article>
	);
}

export default WithData(SingleTemplate);

function useFileData(fileName) {
	const [data, setData] = useState(fileName);
	const [failedRequest, setfailedRequest] = useState(false);

	useEffect(() => {
		try {
			import ('../json-files/files/' + fileName + '.json').then((data) => {
				setData(data);
				setfailedRequest(false);
			});
		} catch (error) {
			setData(null)
			setfailedRequest(true);
		}

	}, [fileName]);

	return { data, failedRequest };
}