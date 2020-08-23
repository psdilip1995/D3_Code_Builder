import * as actionTypes from './actionTypes';

export const drawGraph = graphType => {
	return {
		type: actionTypes.DRAW_GRAPH,
		graphType: graphType
	};
};

export const xDataChange = xData => {
	return {
		type: actionTypes.X_DATA_CHANGE,
		xData: xData
	};
};

export const yDataChange = yData => {
	return {
		type: actionTypes.Y_DATA_CHANGE,
		yData: yData
	};
};

export const hDataChange = hData => {
	return {
		type: actionTypes.H_DATA_CHANGE,
		hData: hData
	};
};

export const sxDataChange = sxData => {
	return {
		type: actionTypes.SX_DATA_CHANGE,
		sxData: sxData
	};
};

export const syDataChange = syData => {
	return {
		type: actionTypes.SY_DATA_CHANGE,
		syData: syData
	};
};