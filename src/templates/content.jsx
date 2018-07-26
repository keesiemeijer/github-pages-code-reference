import React from 'react';
import { isEmpty } from 'lodash';

const Content = props => {

	if (isEmpty(props.element.json_file)) {
		return null;
	}
	const key = props.element.slug + '-' + props.element['line_num'];
	const content = props.data[key]['html'];

	return (
		<div dangerouslySetInnerHTML={{ __html: content }}></div>
	)
}

export default Content;