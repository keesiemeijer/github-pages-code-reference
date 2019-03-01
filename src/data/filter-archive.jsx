export function filterTypeExists(type) {
	const allowed = ['introduced', 'modified', 'deprecated'];
	const exists = allowed.filter((value) => type === value);

	return exists.length === 1;
}

export function filterArchiveItems(items, version, type = '') {
	const allVersions = !version.length;
	if (allVersions && !type.length) {
		return items;
	}

	items = items.filter((item) => {
		const inTerms = (-1 !== item.terms.indexOf(version));
		const isIntroducedTerm = (-1 !== item.terms.indexOf(item.introduced));
		const isDeprecatedTerm = (-1 !== item.terms.indexOf(item.deprecated));
		const isUndocumentedTerm = (-1 !== item.terms.indexOf('undocumented'));

		switch (type) {
			case 'deprecated':
				return allVersions ? item.deprecated : item.deprecated === version;
			case 'introduced':
				return allVersions ? item.introduced : item.introduced === version;
			case 'modified':
				if (allVersions) {
					let termCount = item.terms.length;
					if (!termCount || isUndocumentedTerm) {
						return false;
					}

					termCount = isIntroducedTerm ? --termCount : termCount;
					termCount = isDeprecatedTerm ? --termCount : termCount;

					return 0 < termCount;
				}

				const introduced = isIntroducedTerm && (item.introduced === version);
				const deprecated = isDeprecatedTerm && (item.deprecated === version);

				return inTerms && !(introduced || deprecated);
			default:
		}

		return allVersions ? true : inTerms;
	});

	return items;
}