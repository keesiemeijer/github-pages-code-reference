import React from "react";
import { NavLink, Link } from "react-router-dom";

import Search from "./search";
import withData from "../json-files/with-data.json";
import { getLink } from "../data/selectors";

const PrimaryHeader = props => {
	const { parsed_name, parsed_version, app_description } = props.referenceData;
	const { page, postType, home } = props;

	const searchPostType = "methods" === postType ? "classes" : postType;

	let title = props.strings.page_title;
	if (parsed_name.length) {
		title = parsed_name;
		title += parsed_version.length ? " " + parsed_version : "";
		if ("home" !== page) {
			title = <Link to={home}>{title}</Link>;
		}
	}

	let desc = "";
	if (app_description.length) {
		desc = <p className="site-description">{app_description}</p>;
	}

	return (
		<header className="site-header">
			<h1 className="site-title">{title}</h1>
			{desc}
			{-1 !== withData.indexOf(searchPostType) && (
				<Search {...props} postType={searchPostType} />
			)}
			<nav>
				<NavLink to={home} exact activeClassName="active">
					{props.strings.home}
				</NavLink>
				{withData.map((archivePostType, index) => {
					const archiveLink = getLink(home, archivePostType);
					return (
						"methods" !== archivePostType && (
							<NavLink
								to={archiveLink}
								key={index}
								activeClassName="active"
							>
								{props.strings[archivePostType]}
							</NavLink>
						)
					);
				})}
			</nav>
		</header>
	);
};

export default PrimaryHeader;
