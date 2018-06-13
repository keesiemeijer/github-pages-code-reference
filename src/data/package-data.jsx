import React, { Component } from 'react';

import PackageData from '../../package.json';

const WithPackageData = ( ComponentToWrap ) => {
	return class PackageJsonComponent extends Component {
		render() {
			return (
				<ComponentToWrap {...this.props} packageData={PackageData} />
			)
		}
	}
}

export default WithPackageData