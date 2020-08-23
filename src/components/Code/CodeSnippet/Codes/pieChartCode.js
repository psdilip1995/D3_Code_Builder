import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import classes from './Codes.module.css';
import * as actions from '../../../../store/actions';


const codeString = `
**********PIE CHART CODE****************


Code will come here!
`;

const getDownloadCode = (xData,yData) => {
	return ``;
};

const getCode = (xData, yData) => {

	// const codeStr = <span>
	// 					{codeString1}
	// 					<strong>select the svg in which you want to plot the graph</strong>
	// 					{codeString2}
	// 					<strong>1. Identify Domain and Data</strong>
	// 					{codeString3(xData,yData)}
	// 					<strong>2. Set the maximum value of the y-axis</strong>
	// 					{codeString4(yData)}
	// 					<strong>3. Define Scale</strong>
	// 					{codeString5}
	// 					<strong>4. Define Axis</strong>
	// 					{codeString6}
	// 					<strong>5. Append Html Elements of axis</strong>
	// 					{codeString7}
	// 					<strong>6. plot the bars</strong>
	// 					{codeString8(xData)}
	// 					<strong>7. Attach the Labels and Title</strong>
	// 					{codeString9}
	// 				</span>;
	return codeString;
};
//
const Code = props => {

    useEffect(()=>{
        props.onMount(getDownloadCode(props.xData,props.yData));
    });

	return (
		<span className={classes.Codes}>
			{getCode(props.xData, props.yData)}
		</span>
	);
};
//
const mapDispatchToProps = dispatch => {
    return {
        onMount: (jsData) => dispatch(actions.generateCode(jsData))
    };
};

export default connect(null,mapDispatchToProps)(Code);