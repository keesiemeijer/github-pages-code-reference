import React from 'react';

const Summary = props => {
	if (!props.element.hasOwnProperty('summary')) {
		return null;
	}

	if (!props.element.summary.length) {
		return null;
	}

	return (
		<section className="summary" dangerouslySetInnerHTML={{ __html: props.element.summary }}></section>
	)
}

export default Summary;