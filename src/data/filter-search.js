import { sortByLength } from "./selectors";

const filterContains = function(text, input) {
	return RegExp(regExpEscape(input.trim()), "i").test(text);
};

const regExpEscape = function(s) {
	return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
}

export function filterSearchItems(items, search = '') {
	search = search.trim().toLowerCase();
	if (!search.length) {
		return items;
	}

	if (!items.length) {
		return [];
	}

	return items.filter(value =>
		searchFilter(value.title.toLowerCase(), search)
	).sort(sortByLength);
}

export function searchFilter(text, input) {
	// Filter autocomplete matches

	// Full match
	if (filterContains(text, input)) {
		// mark
		return true;
	}

	// Replace - _ and whitespace with a single space
	var _text = regExpEscape(text.trim().toLowerCase().replace(/[_\-\s]+/g, ' '));
	var _input = regExpEscape(input.trim().toLowerCase().replace(/[_\-\s]+/g, ' '));

	// Matches with with single spaces between words
	if (filterContains(_text, _input)) {
		return true;
	}

	_input = _input.split(" ");
	var words = _input.length;

	if (1 >= words) {
		return false;
	}

	// Partial matches
	var partials = 0;
	for (let i = 0; i < words; i++) {
		if (_text.indexOf(_input[i].trim()) !== -1) {
			partials++;
		}
	}

	if (partials === words) {
		return true;
	}

	return false;
}