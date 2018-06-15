import React from 'react';
import { isEmpty } from 'lodash';

const Content = props => {

	if (isEmpty(props.element.json_file)) {
		return null;
	}

	const content = props.data[props.element.slug]['html'];

	return (
		<div dangerouslySetInnerHTML={{ __html: content }}></div>
	)
}

export default Content;