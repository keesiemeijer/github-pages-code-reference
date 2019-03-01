import React, { useState, useEffect } from "react";

export default function Spinner(props) {
	const [timePassed, setTimePassed] = useState(false);

	useEffect(() => {
		let timer = setTimeout(() => {
			setTimePassed(true);
		}, 500);

		return () => clearTimeout(timer);
	}, [timePassed]);

	if (!timePassed) {
		return null;
	}

	const message = props.hasOwnProperty('message') ? props['message'] : '';
	if (!message.length) {
		return (<div className="loader">Loading...</div>);
	} else {
		return (<div>{message}</div>)
	}
}