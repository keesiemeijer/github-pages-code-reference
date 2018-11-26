import React from "react";
import { isEmpty } from 'lodash';

export const DataContext = React.createContext();

export class DataProvider extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			functions: {},
			classes: {},
			hooks: {},
			methods: {},
		}
	};

	fetchData = (postType) => {
		this.setState({
			status: "searching",
			postType: postType,
		});

		if (!isEmpty(this.state[postType])) {
			this.setState({
				status: 'done',
			});
			return;
		}

		try {
			import ('../json-files/post-types/' + postType + '.json').then((data) => {
				this.setState({
					[postType]: data,
					status: 'done',
				});
			});
		} catch (error) {
			this.setState({
				status: "error",
			});
		}
	};

	render() {
		return (
			<DataContext.Provider value={{ postType: this.state.postType, postTypeData: this.state, fetchData: this.fetchData }} >
				{this.props.children}
	  		</DataContext.Provider>
		);
	}
}