import React from "react";

import isEmpty from 'lodash/isEmpty';
import get from "lodash/get";

import Spinner from "../components/spinner.jsx";

export function WithData(WrappedComponent) {

	return class extends React.Component {
		componentDidUpdate(prevProps, prevState) {
			if (prevProps.postType !== this.props.postType) {
				if (isEmpty(this.props.postTypeData[this.props.postType])) {
					this.props.fetchData(this.props.postType);
				}
			}
		}

		componentDidMount() {
			//console.log(this.props);
			if (isEmpty(this.props.postTypeData[this.props.postType])) {
				this.props.fetchData(this.props.postType);
			}
		}

		render() {
			let content = get(this.props, 'postTypeData.' + this.props.postType + '.content', []);

			if (!isEmpty(content)) {
				content = content.sort(function(a, b) {
					var textA = a.title.toUpperCase();
					var textB = b.title.toUpperCase();
					return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				});
				return (<WrappedComponent {...this.props} content={content} />)
			}
			
			return <Spinner />;
		}
	}
}

export default WithData;