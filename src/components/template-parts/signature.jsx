import React from 'react';

const Signature = props => {
	if (!props.data.hasOwnProperty('signature')) {
		return null;
	}

	if (!props.data.signature.length) {
		return null;
	}

	return (
		<h1 dangerouslySetInnerHTML={{ __html: props.data.signature }}></h1>
	)
}

export default Signature;