import React from 'react';
import {connect} from 'react-redux';

import Button from '../../../hoc/UI/Button/Button';
import * as graphTypes from '../Graph/graphTypes';

import classes from './DownloadCodeButton.module.css';

const htmlCode1 = `
<html>
	<head>
		<title>`;
//Title of HTML PAGE
const htmlCode2 = `</title>
		<script src="https://d3js.org/d3.v5.min.js"></script>
	</head>
	<body>
		<div id="graph" style="text-align:center">
			<svg id="chartSVG" width="450px" height="400px">
			</svg>
		</div>
		<script>
		`;
const htmlCode3 = `
		</script>
		<div style="position:fixed;top:90%;left:0;height:10%;background-color:steelblue;text-align:center;color:white;width:100%;padding-top:20px;min-height:60px"> This Page is created using D3 CODE BUILDER</div>
	</body>
</html>
`;

const getPageTitle = filename => {
	switch(filename){
		case graphTypes.VERTICAL_BAR_CHART 	: return 'D3 Vertical Bar Chart';
		case graphTypes.HORIZONTAL_BAR_CHART: return '';
		case graphTypes.HISTOGRAM 			: return '';
		case graphTypes.PIE_CHART 			: return '';
		case graphTypes.SCATTER_PLOT 		: return '';
		case graphTypes.LINE_CHART 			: return '';
		default : return 'D3 CODE BUILDER';
	};
};

const prepareDownloadData = (filename,jsData) => {
	const pageTitle = getPageTitle(filename);
	const htmlData = htmlCode1+pageTitle+htmlCode2+jsData+htmlCode3;
	return htmlData;
};

const downloadCode = (filename,jsData) => {

	let filedata = prepareDownloadData(filename,jsData);

	let element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(filedata));
	element.setAttribute('download', filename+'.html');

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
};

const DownloadCodeButton = props => {
	return (
		<div className={classes.DownloadCodeButton}>
			<Button click={() => downloadCode(props.selectedGraph,props.javaScriptCode)}>
				Download As HTML
			</Button>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		selectedGraph	: state.builder.selectedGraph,
		javaScriptCode: state.code.javaScriptCode
	};
};
const mapDispatchToProps = dispatch => {
	return {
		
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(DownloadCodeButton);