import React, { Component } from "react"

import Functions from '../json-files/functions.json';
import Classes from '../json-files/classes.json';
import Hooks from '../json-files/hooks.json';
import Methods from '../json-files/methods.json';

const parsedData = {
	functions: Functions,
	classes: Classes,
	hooks: Hooks,
	methods: Methods,
}

export

const WithParsedData = ( ComponentToWrap, {...props} ) => {
	return class JsonDataComponent extends Component {
		render() {

			let { postType } = this.props;

			let searchData = {};
			if( ( 'SingleTemplate' === ComponentToWrap.name ) && ( 'methods' === postType ) ) {
				if( parsedData.hasOwnProperty('classes') ) {
					searchData = parsedData['classes'];
				}
			}

			let data = {}
			if( postType && parsedData.hasOwnProperty(postType)) {
				data = parsedData[postType];
			}

			const withData = Object.keys(parsedData).filter( (item, index) => {
				const exists = typeof parsedData[item]['content'] !== 'undefined';
				return exists && parsedData[item]['content'];
			} );

			return (
				<ComponentToWrap {...this.props}
					parsedData={data}
					searchData={searchData}
					withData={withData}
				/>
			)
		}
	}
}


export default WithParsedData;