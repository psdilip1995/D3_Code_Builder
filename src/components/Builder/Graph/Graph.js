import React from 'react';
import {connect} from 'react-redux';

import VerticalBarGraph from './Plots/verticalBarGraph';
import HorizontalBarGraph from './Plots/horizontalBarGraph';
import Histogram from './Plots/histogram';
import PieChart from './Plots/pieChart';
import ScatterPlot from './Plots/scatterPlot';
import LineGraph from './Plots/lineGraph';

import classes from './Graph.module.css';
import * as graphTypes from './graphTypes';


const getPlot = (type, xData, yData, hData, sxData, syData) => {
	switch(type){
		case graphTypes.VERTICAL_BAR_CHART 	: return <VerticalBarGraph xData={xData} yData={yData}/>;
		case graphTypes.HORIZONTAL_BAR_CHART: return <HorizontalBarGraph xData={xData} yData={yData}/>;
		case graphTypes.HISTOGRAM 			: return <Histogram hData={hData}/>;
		case graphTypes.PIE_CHART 			: return <PieChart xData={xData} yData={yData}/>;
		case graphTypes.SCATTER_PLOT 		: return <ScatterPlot xData={sxData} yData={syData}/>;
		case graphTypes.LINE_CHART 			: return <LineGraph xData={xData} yData={yData}/>;
		default: return <p>Some Error Has Occured!!!</p>;
	}
};
//
const graph = props => {
	return (
		<div className={classes.Graph} id="graph">
			{getPlot(props.selectedGraph, props.xData, props.yData, props.hData, props.sxData, props.syData)}
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

export default connect(mapStateToProps,mapDispatchToProps)(graph);