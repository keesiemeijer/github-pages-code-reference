import React from 'react';

const Content = props => {
	if (!props.data.hasOwnProperty('html')) {
		return null;
	}

	if (!props.data.html.length) {
		return null;
	}

	return (
		<div dangerouslySetInnerHTML={{ __html: props.data.html }}></div>
	)
}

export default Content;