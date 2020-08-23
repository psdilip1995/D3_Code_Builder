import * as actionTypes from '../actions/actionTypes';
import * as graphTypes from '../../components/Builder/Graph/graphTypes';

const graphs = [
				{type: graphTypes.VERTICAL_BAR_CHART,label:'Vertical Bar Char'},
				{type: graphTypes.HORIZONTAL_BAR_CHART,label:'Horizontal Bar Chart'},
				{type: graphTypes.HISTOGRAM,label:'Histogram'},
				{type: graphTypes.PIE_CHART,label:'Pie Chart'},
				{type: graphTypes.SCATTER_PLOT,label:'Scatter Plot'},
				{type: graphTypes.LINE_CHART,label:'Line Chart'}
				];

const initialState = {
	graphTypes		: graphs,
	selectedGraph	: graphTypes.VERTICAL_BAR_CHART,
	yData			: [57,24,98,67,13],
	xData			: ['kiwi','apple','banana','grapes','oranges'],
	histogramData	: [1,1,12,34,56,12,13,45,36,12,1,11,98,34,34,23,27,29,80],
	sxData			: [23,45,12,48,29,63],
	syData			: [46,93,29,28,62,38]
};

const drawGraph = (state, action) => {
	return {
		...state,
		selectedGraph: action.graphType
	};
};

const xDataChange = (state, action) => {
	return {
		...state,
		xData: action.xData
	};
};

const yDataChange = (state, action) => {
	return {
		...state,
		yData: action.yData
	};
};

const hDataChange = (state, action) => {
	return {
		...state,
		histogramData: action.hData
	};
};

const sxDataChange = (state, action) => {
	return {
		...state,
		sxData: action.sxData
	};
};

const syDataChange = (state, action) => {
	return {
		...state,
		syData: action.syData
	};
};

const reducer = (state=initialState, action) => {
	switch(action.type){
		case(actionTypes.DRAW_GRAPH): return drawGraph(state, action);
		case(actionTypes.X_DATA_CHANGE): return xDataChange(state, action);
		case(actionTypes.Y_DATA_CHANGE): return yDataChange(state, action);
		case(actionTypes.H_DATA_CHANGE): return hDataChange(state, action);
		case(actionTypes.SX_DATA_CHANGE): return sxDataChange(state, action);
		case(actionTypes.SY_DATA_CHANGE): return syDataChange(state, action);
		default						: return state;
	}
};

export default reducer;