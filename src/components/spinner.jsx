import React, { useState, useEffect } from "react";

export default function Spinner() {
	const [timePassed, setTimePassed] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimePassed(true);
		}, 500);

		return () => clearTimeout(timer);
	}, [timePassed]);

	if (!timePassed) {
		return null;
	}

	return <div className="loader">Loading...</div>;
}