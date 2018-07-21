import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Autosuggest from 'react-autosuggest';
import { findIndex, isEmpty } from 'lodash';

const filterContains = function(text, input) {
	return RegExp(regExpEscape(input.trim()), "i").test(text);
};

const regExpEscape = function(s) {
	return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
}

const sortByLength = function(a, b) {
	a = a.title;
	b = b.title;
	if (a.length !== b.length) {
		return a.length - b.length;
	}

	return a < b ? -1 : 1;
};

const getSuggestions = function(text, input) {
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


class Search extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			value: '',
			suggestions: [],
			isLoading: false,
			functions: {},
			classes: {},
			hooks: {},
		};

		this.lastRequestId = null;
	}

	handleSubmit(event) {
		event.preventDefault();

		let location = this.props.home + '/' + this.props.postType;
		let index = findIndex(this.state[this.props.postType].content, value => value.title === this.state.value);
		if (-1 !== index) {
			location = location + '/' + this.state[this.props.postType].content[index].slug;
		} else {
			location = location + '/' + this.state.value;
		}

		this.props.history.push(location);
	}

	loadSuggestions(value) {
		let postType = this.props.postType;

		if (!isEmpty(this.state[postType])) {
			this.setState({
				isLoading: false,
				suggestions: this.getSuggestions(value, this.state[postType])
			});
			return;
		}

		this.setState({
			isLoading: true
		});

		import ('../json-files/' + postType + '.json').then((data) => {
			this.setState({
				[postType]: data,
				isLoading: false,
				suggestions: this.getSuggestions(value, data)
			});
		});
	}

	getSuggestions(value, data) {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		return inputLength === 0 ? [] :
			data.content.filter(value =>
				getSuggestions(value.title.toLowerCase(), inputValue)
			).sort(sortByLength);
	};

	renderSuggestion(suggestion) {
		return (
			<div>
				{suggestion.title}
			</div>
		);
	};

	onChange = (event, { newValue }) => {
		this.setState({
			value: newValue,
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.loadSuggestions(value);
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	render() {
		const { value, suggestions } = this.state;
		const { postType } = this.props;

		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			placeholder: this.props.strings[postType + '_search'],
			value,
			onChange: this.onChange
		};

		// Finally, render it!
		return (
			<form onSubmit={this.handleSubmit}>
				<Autosuggest
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					getSuggestionValue={suggestion => suggestion.title}
					renderSuggestion={this.renderSuggestion}
					inputProps={inputProps}
				/>
				<input type="submit" value={this.props.strings.submit} id="submit" />
			</form>
		);
	}
}

export default withRouter(Search);