import React from "react";
import { Redirect } from "react-router-dom";
import { findIndex } from "lodash";

import { getPostClass } from "../data/post-type-data";
import PrimaryTemplate from "./primary-template";
import WithParsedData from "../data/parsed-data";
import Signature from "../templates/signature";
import Summary from "../templates/summary";
import Content from "../templates/content";
import Source from "../templates/source";
import Related from "../templates/related";
import Changelog from "../templates/changelog";
import Methods from "../templates/methods";

const SingleTemplate = props => {
	window.scrollTo(0, 0);
	const typeElements = props["parsedData"]["content"];


	if (!typeElements.length) {
		return <Redirect to={props.home} />;
	}

	const index = findIndex(typeElements, value => value.slug === props.slug);

	let element;
	if (-1 === index) {
		return <Redirect to={props.home} />;
	} else {
		element = typeElements[index];
	}

	let postClass = getPostClass( props.postType );
	const data = require('../json-files/html/' + element.json_file + '.json');

	return (
		<PrimaryTemplate {...props}>
			<article className={postClass}>
				<Signature element={element} />
				<Summary element={element} />
				<Source {...props} element={element}  />
				<Content element={element} data={data} />
				<Changelog element={element} data={data} />
				<Methods element={element} data={data} />
				<Related element={element} data={data} />
			</article>
		</PrimaryTemplate>
	);
};

export default WithParsedData(SingleTemplate);
