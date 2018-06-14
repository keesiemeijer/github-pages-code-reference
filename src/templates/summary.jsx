import React from 'react';

const Summary = props => {
	return (
		<section className="summary" dangerouslySetInnerHTML={{ __html: props.element.summary }}></section>
	)
}

export default Summary;