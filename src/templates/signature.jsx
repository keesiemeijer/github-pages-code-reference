import React from 'react';

const Signature = props => {
	return (
		<h1 dangerouslySetInnerHTML={{ __html: props.element.signature }}></h1>
	)
}

export default Signature;