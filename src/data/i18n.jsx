import Strings from '../json-files/wp-parser-json-strings.json';

export function termsFoundInfo(version, postType, filter, itemCount) {
		const hasFilter = filter.length && 'none' !== filter;
		const isUndocumented = ('undocumented' === version);

		// Plural or single post type string
		let single = postType.substring(0, postType.length - 1);
		single = ('classe' === single) ? 'class' : single;
		let postTypeString = !itemCount || (1 < itemCount) ? postType : single;
		postType = Strings[postTypeString].toLowerCase();

		// Replace placeholders
		// Todo: use https://www.npmjs.com/package/sprintf-js ?
		let replacePostType = itemCount ? '%2$s' : '%1$s';
		let replaceVersion = itemCount ? '%3$s' : '%2$s';
		let replaceFilter = itemCount ? '%2$s' : '%1$s';
		const not = itemCount ? '' : 'not_';
		let string = version.length ? `filter_version_${not}found` : `${not}found`;
		let info = Strings[string];
		if (hasFilter || isUndocumented) {
			filter = isUndocumented ? Strings['undocumented'] : filter;

			string = `filter_type_${not}found`
			if (version.length && !isUndocumented) {
				string = `filter_all_${not}found`;
				replaceVersion = itemCount ? '%4$s' : '%3$s';
			}

			replacePostType = itemCount ? '%3$s' : '%2$s';
			info = Strings[string].replace(replaceFilter, filter);
		}

		if (itemCount) {
			info = info.replace('%1$d', itemCount);
		}

		return info.replace(replacePostType, postTypeString).replace(replaceVersion, version);
}