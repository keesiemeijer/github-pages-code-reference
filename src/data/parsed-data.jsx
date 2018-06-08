import React, { Component } from "react"

import Functions from '../json-files/functions.json';
import Classes from '../json-files/classes.json';
import Hooks from '../json-files/hooks.json';

const parsedData = {
	functions: Functions,
	classes: Classes,
	hooks: Hooks,
}

const WithParsedData = ( ComponentToWrap ) => {
	return class JsonDataComponent extends Component {
		render() {
			return (
				<ComponentToWrap {...this.props} parsedData={parsedData} />
			)
		}
	}
}

export default WithParsedData