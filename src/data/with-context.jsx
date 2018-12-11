import React, {Component} from "react";

import { DataContext } from "../contexts/DataContext";

export default function WithContext(WrappedComponent) {
	return class extends Component {
		render() {
			return (<DataContext.Consumer>
				{
					({ postType, postTypeData, fetchData }) => (
						<WrappedComponent {...this.props}
							postType={ this.props.postType}
							postTypeData={postTypeData}
							fetchData={fetchData}
						/>
					)
				}
	 		</DataContext.Consumer>)
		}
	}
}