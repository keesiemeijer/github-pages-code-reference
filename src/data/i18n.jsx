import Strings from '../json-files/wp-parser-json-strings.json';
import { getPostTypeSingle } from "./selectors";

export function postsFoundInfo(version, postType, filter, postCount) {
	const hasFilter = filter.length;
	const isUndocumented = ('undocumented' === version);

	const single = getPostTypeSingle(postType);
	let postTypeString = !postCount || (1 < postCount) ? postType : single;

	// Plural or single post type string
	postType = Strings[postTypeString].toLowerCase();

	// Replace placeholders
	// Todo: use https://www.npmjs.com/package/sprintf-js ?
	let replacePostType = postCount ? '%2$s' : '%1$s';
	let replaceVersion = postCount ? '%3$s' : '%2$s';
	let replaceFilter = postCount ? '%2$s' : '%1$s';
	const not = postCount ? '' : 'not_';
	let string = version.length ? `filter_version_${not}found` : `${not}found`;
	let info = Strings[string];
	if (hasFilter || isUndocumented) {
		filter = isUndocumented ? Strings['undocumented'] : filter;

		string = `filter_type_${not}found`
		if (version.length && !isUndocumented) {
			string = `filter_all_${not}found`;
			replaceVersion = postCount ? '%4$s' : '%3$s';
		}

		replacePostType = postCount ? '%3$s' : '%2$s';
		info = Strings[string].replace(replaceFilter, filter);
	}

	if (postCount) {
		info = info.replace('%1$d', postCount);
	}

	return info.replace(replacePostType, postTypeString).replace(replaceVersion, version);
}