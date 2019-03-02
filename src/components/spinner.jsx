import React, { useState, useEffect } from "react";
import Strings from '../json-files/wp-parser-json-strings.json';


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
		return (<div className="loader">{Strings['loading']}</div>);
	} else {
		return (<div>{message}</div>)
	}
}