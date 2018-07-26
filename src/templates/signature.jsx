import React from 'react';
import { isEmpty } from 'lodash';

const Signature = props => {
	const key = props.element.slug + '-' + props.element['line_num'];
	const signature = props.data[ key ]['signature'];
	if (isEmpty(signature)) {
		return null;
	}

	return (
		<h1 dangerouslySetInnerHTML={{ __html: signature }}></h1>
	)
}

export default Signature;