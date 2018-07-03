// Todo: remove this file
import React, { Component } from "react"
import { isEmpty } from 'lodash';

import LoadComponent from "../components/load-component";
import withData from '../json-files/with-data.json';

const WithParsedData = (ComponentToWrap, {...props }) => {
	return class JsonDataComponent extends Component {
		constructor(props) {
			super(props);
			this.state = {
				searchData: {},
				isMounted: false,
				functions: {},
				classes: {},
				hooks: {},
				methods: {},
			}
		}

		request() {
			const postType = this.props.postType;
			//this._asyncRequest = this.props.postType;
			if (!isEmpty(this.state[postType])) {
				return;
			}

			console.log("do request", this.state);
			import ('../json-files/' + this.props.postType + '.json').then((data) => {
				this._asyncRequest = null;
				//let state = this.state;
				let state = Object.assign({}, this.state);
				state['postType'] = postType;
				state[postType] = data;

				this.setState(state);
			});
		}

		static getDerivedStateFromProps(nextProps, prevState) {
			if (nextProps.postType !== prevState.postType) {

				if (!isEmpty(prevState[nextProps.postType])) {
					return null;
				}

				let state = Object.assign({}, prevState);

				// state[prevState.postType] = nextProps.data;

				withData.map((item, index) => {
					if (!isEmpty(prevState[item])) {
						state[item] = prevState[item]
					}
				});
				state['postType'] = nextProps.postType;
				console.log('post type change pref', state);
				return state;
			}

			return null;
		}


		componentDidUpdate(prevProps, prevState) {
			if (prevProps.postType !== this.state.postType) {
				if (isEmpty(this.state[this.state.postType])) {

					this.request();
				}
			}
		}

		componentDidMount() {
			console.log('mount', this.state);
			this.request();

		}

		componentWillUnmount() {
			if (this._asyncRequest) {
				//this._asyncRequest.cancel();
			}
		}

		render() {
			let { postType } = this.props;

			console.log('state', this.state);

			let data = {};
			if (!isEmpty(this.state[postType])) {
				data = this.state[postType];
			}

			// let searchData = {};
			// if (('SingleTemplate' === ComponentToWrap.name) && ('methods' === postType)) {
			// 	if (parsedData.hasOwnProperty('classes')) {
			// 		searchData = parsedData['classes'];
			// 	}
			// }

			if (isEmpty(data)) {
				console.log('DATA EMPTY');
				return (<LoadComponent {...props} />);
			}

			return (
				<ComponentToWrap {...this.props}
					parsedData={data}
					searchData={this.state.searchData}
				/>
			)
		}
	}
}


export default WithParsedData;