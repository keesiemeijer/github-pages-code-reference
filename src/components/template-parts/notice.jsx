import React from 'react';

const Notice = props => {
	if (!props.data.hasOwnProperty('notice')) {
		return null;
	}

	if (!props.data.notice.length) {
		return null;
	}

	return (
		<div dangerouslySetInnerHTML={{ __html: props.data.notice }}></div>
	)
}

export default Notice;