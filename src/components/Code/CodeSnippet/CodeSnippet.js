import React from 'react';
import {connect} from 'react-redux';

import * as graphTypes from '../../Builder/Graph/graphTypes';
import classes from './CodeSnippet.module.css';

import VeriticalBarGraphCode from './Codes/verticalBarGraphCode.js';
import HorizontalBarGraphCode from './Codes/horizontalBarGraphCode';
import HistogramCode from './Codes/histogramCode';
import PieChartCode from './Codes/pieChartCode';
import ScatterPlotCode from './Codes/scatterPlotCode';
import LineChartCode from './Codes/lineChartCode';

const getCode = (graphType, xData, yData, hData, sxData, syData) => {
	switch(graphType){
		case graphTypes.VERTICAL_BAR_CHART 	: return <VeriticalBarGraphCode xData={xData} yData={yData}/>;
		case graphTypes.HORIZONTAL_BAR_CHART: return <HorizontalBarGraphCode xData={xData} yData={yData}/>;
		case graphTypes.HISTOGRAM 			: return <HistogramCode hData={hData}/>;
		case graphTypes.PIE_CHART 			: return <PieChartCode xData={xData} yData={yData}/>;
		case graphTypes.SCATTER_PLOT 		: return <ScatterPlotCode xData={sxData} yData={syData}/>;
		case graphTypes.LINE_CHART 			: return <LineChartCode xData={xData} yData={yData}/>;
		default: return <p> Some Error Has Occured!!!</p>;
	};
};
//
const CodeSnippet = props => {
	return(
		<div className={classes.CodeSnippet}>
			{getCode(props.selectedGraph, props.xData, props.yData, props.hData, props.sxData, props.syData)}
		</div>
	);
};
//
const mapStateToProps = state => {
	return {
		selectedGraph	: state.builder.selectedGraph,
		xData	: state.builder.xData,
		yData	: state.builder.yData,
		hData	: state.builder.histogramData,
		sxData	: state.builder.sxData,
		syData	: state.builder.syData
	};
};
const mapDispatchToProps = dispatch => {
	return {
		
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(CodeSnippet);