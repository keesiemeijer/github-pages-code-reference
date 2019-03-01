import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Autosuggest from 'react-autosuggest';

import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';

import { getLink } from "../data/selectors";
import { filterSearchItems } from "../data/filter-search";

class Search extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			value: '',
			suggestions: [],
			isLoading: false,
		};

		this.lastRequestId = null;
	}

	handleSubmit(event) {
		event.preventDefault();

		let location = getLink(this.props.home, this.props.postType);
		const data = this.props.postTypeData[this.props.postType];
		let index = findIndex(data.content, value => value.title === this.state.value);
		if (-1 !== index) {
			location = location + '/' + data.content[index].slug;
		} else {
			location = location + '/?search=' + this.state.value.trim().replace(/\s+/g, '+');
		}

		this.props.history.push(location);
	}

	loadSuggestions(value) {
		const postType = this.props.postType;

		this.setState({
			isLoading: true
		});

		this.props.fetchData(postType);

		if (!isEmpty(this.props.postTypeData[postType])) {
			const items = this.props.postTypeData[postType]['content'];
			this.setState({
				isLoading: false,
				suggestions: filterSearchItems(items, value)
			});
			return;
		}
	}

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