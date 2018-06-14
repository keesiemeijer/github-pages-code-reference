import React from 'react';
import { isEmpty } from 'lodash';

const Content = props => {

	if (isEmpty(props.element.json_file)) {
		return null;
	}

	const fileContent = require('../json-files/html/' + props.element.json_file + '.json');
	const content = fileContent[props.element.slug];

	return (
		<div dangerouslySetInnerHTML={{ __html: content }}></div>
	)
}

export default Content;