import React from 'react';
import {connect} from 'react-redux';

import Input from '../../../hoc/UI/Input/Input';
import * as actions from '../../../store/actions';
import * as graphTypes from '../../Builder/Graph/graphTypes';

import classes from './InputData.module.css';


const InputData = props => {
	let xData = props.xData.toString();
	let yData = props.yData.toString();
	let hData = props.hData.toString();
	let sxData= props.sxData.toString();
	let syData= props.syData.toString();
	let error = "";
	if(!/^[0-9,.]+$/.test(yData))
		error = "ERROR : Y-Axis data should contain only numbers seperated by , ";
	if(xData.split(",").length !== yData.split(",").length)
		error = "ERROR : X-Axis has "+xData.split(",").length+" elements and Y-Axis has "+yData.split(",").length+" elements";
	if(!/^[0-9,.]+$/.test(hData))
		error = "ERROR : X-Axis data should contain only numbers seperated by , ";
	if(sxData.split(",").length !== syData.split(",").length)
		error = "ERROR : X-Axis has "+sxData.split(",").length+" elements and Y-Axis has "+syData.split(",").length+" elements";

	const xChanged = (event) => {
		let xVal = event.target.value;
		props.onXDataChange(xVal.split(","));
	};

	const yChanged = (event) => {
		let yVal = event.target.value;
		if(/^[0-9,.]*$/.test(yVal))
			props.onYDataChange(yVal.split(","));
	};

	const hChanged = (event) => {
		let hVal = event.target.value;
		//console.log(hVal);
		if(/^[0-9,.]*$/.test(hVal)){
			//console.log("coming here");
			props.onHDataChange(hVal.split(","));
		}
	};

	const sxChanged = (event) => {
		let sxVal = event.target.value;
		if(/^[0-9,.]*$/.test(sxVal))
			props.onSxDataChanged(sxVal.split(","));
	};

	const syChanged = (event) => {
		let syVal = event.target.value;
		if(/^[0-9,.]*$/.test(syVal))
			props.onSyDataChanged(syVal.split(","));
	};

	let firstInputBox = "Enter Y-Axis Data";
	let secondInputBox= "Enter X-Axis Data";
	let showFirstBox = true;
	let showSecondBox= false;
	let showScatterBox = false;
	if(props.selectedGraph === graphTypes.HORIZONTAL_BAR_CHART){
		firstInputBox = "Enter X-Axis Data";
		secondInputBox= "Enter Y-Axis Data";
	}
	if(props.selectedGraph === graphTypes.PIE_CHART){
		firstInputBox = "Enter Percentages";
		secondInputBox= "Enter Legend Data";
	}
	if(props.selectedGraph === graphTypes.HISTOGRAM){
		firstInputBox = "Enter X-Axis Data";
		showFirstBox = false;
		showSecondBox = true;
		showScatterBox = false;
	}
	if(props.selectedGraph === graphTypes.SCATTER_PLOT){
		showFirstBox = false;
		showSecondBox= false;
		showScatterBox= true;
	}

	let uploadData = "";

	const fileUpload = (event) => {
		const filename = event.target.value;
		const extension= filename.split('.').pop();
		if(extension !== 'csv'){
			alert('only CSV files are accepted');
			event.target.value = '';
		}
		else{
			console.log(event.target.files[0].type);
			const reader  = new FileReader();
			reader.onload = (event) => uploadData = event.target.result;
			reader.readAsText(event.target.files[0]);
		}
	};

	return(
		<div className={classes.InputData}>
			<div className={classes.UploadBtnDiv} style={{display:'none'}}>
				<input type='file' id="inputfile" onChange={fileUpload}/>
			</div>
			<div className={classes.TextboxDiv}>
				<Input label={firstInputBox } changed={yChanged} value={yData} show={showFirstBox }/>
				<Input label={secondInputBox} changed={xChanged} value={xData} show={showFirstBox }/>
				<Input label="Enter X-Axis Data" changed={hChanged} value={hData} show={showSecondBox} />
				<Input label="Enter X-Axis Data" changed={sxChanged} value={sxData} show={showScatterBox} />
				<Input label="Enter Y-Axis Data" changed={syChanged} value={syData} show={showScatterBox} />
				<p className={classes.error}>{error}</p>
			</div>
		</div>
	);
};
//
const mapStateToProps = state => {
	return {
		selectedGraph	: state.builder.selectedGraph,
		xData	: state.builder.xData,
		yData	: state.builder.yData,
		hData: state.builder.histogramData,
		sxData	: state.builder.sxData,
		syData	: state.builder.syData
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onXDataChange: (xData) => dispatch(actions.xDataChange(xData)),
		onYDataChange: (yData) => dispatch(actions.yDataChange(yData)),
		onHDataChange: (hData) => dispatch(actions.hDataChange(hData)),
		onSxDataChanged: (sxData) => dispatch(actions.sxDataChange(sxData)),
		onSyDataChanged: (syData) => dispatch(actions.syDataChange(syData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InputData);