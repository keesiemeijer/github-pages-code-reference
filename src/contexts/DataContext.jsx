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
			file: {},
		}
	};

	getFileData = (fileName) => {
		try {
			import ('../json-files/files/' + fileName + '.json').then((data) => {
				this.setState({
					file: data,
					status: 'done',
				});
			});
		} catch (error) {
			this.setState({
				status: "error",
				file: {},
			});
		}
	}

	fetchData = (postType, fileName) => {
		this.setState({
			status: "searching",
			postType: postType,
			file: {},
		});

		if (!isEmpty(fileName)) {
			this.getFileData(fileName);
			return;
		}

		if (!isEmpty(this.state[postType])) {
			this.setState({
				status: 'done',
			});

			return;
		}

		try {
			import ('../json-files/' + postType + '.json').then((data) => {
				this.setState({
					[postType]: data,
					status: 'done',
				});
			});
		} catch (error) {
			this.setState({
				status: "error"
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