import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import classes from './Codes.module.css';
import * as actions from '../../../../store/actions';


const codeString1 = `
**********SCATTER PLOT CODE****************


`;

//select the svg in which you want to plot the graph
const codeString2 = `
let svg = d3.select("#graph").select("#chartSVG");

`;
// 1. Identify Domain
const codeString3 = (xData,yData) => {

let xMax = xData[0];
let xMin = xData[0];
let yMax = yData[0];
let yMin = yData[0];
for(let i in xData){
	xMax = Math.max(xData[i],xMax);
	xMin = Math.min(xData[i],xMin);
}
for(let i in yData){
	yMax = Math.max(yData[i],yMax);
	yMin = Math.min(yData[i],yMin);
}

xMax = Math.ceil(xMax/10)*10;
xMin = Math.floor(xMin/10)*10;
yMax = Math.ceil(yMax/10)*10;
yMin = Math.floor(yMin/10)*10;

return `
let xDomain = [`+xMin+`, `+xMax+`];
let yDomain = [`+yMin+`, `+yMax+`];

`
};

// 2. Identify Data
const codeString4 = (xData,yData) => {
return `
let xAxisData = [`+xData+`];
let yAxisData = [`+yData+`];

`
};

// 3. Define Scale
const codeString5 = `
let xScale = d3.scaleLinear().domain(xDomain).range([50,400]); // starting and ending points on svg 
let yScale = d3.scaleLinear().domain(yDomain).range([350,50]); // starting and ending points

`;
// 4. Define Axis
const codeString6 =`
let xAxis = d3.axisBottom().scale(xScale);
let yAxis = d3.axisLeft().scale(yScale);

`;
// 5. Append Html Elements of axis
const codeString7 =`
svg.append('g').attr('transform','translate(0,350)').call(xAxis);
svg.append('g').attr('transform','translate(50,0)').call(yAxis);

`;
// 6. plot the bars
const codeString8 = `
svg.selectAll(".dot")
    .data(xAxisData)
    .enter()
    .append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("fill", "steelblue")
    .attr("cx", function(d) { return xScale(d) })
    .attr("cy", function(d,i) { return yScale(yAxisData[i]) })
    .attr("r", 4)
    .on('mouseover',function(d,i){
    	svg.append("text")
            .text("x:"+d+" - y:"+yAxisData[i])
            .attr("id",() => 'val'+i)
            .attr("x",function(){ return xScale(d)-10})
            .attr("y",function(){ return yScale(yAxisData[i])-10 });

    	d3.select(this).attr("fill","red");
    })
    .on('mouseout',function(d,i){
    	d3.select("#val"+i).remove();
    	d3.select(this).attr("fill","steelblue");
    });

`;
// 7. Attach the Labels and Title
const codeString9 = `
svg.append("text")
    .text("Scatter Plot")
    .style("font-size","1.5em")
    .attr("x",150)
    .attr("y",25);

svg.append("text")
    .text("X-Axis")
    .attr("x",350)
    .attr("y",390);

svg.append("text")
    .text("Y-Axis")
    .attr("x",-210)
    .attr("y",20)
    .attr("transform","rotate(-90)");
`;

const getDownloadCode = (xData,yData) => {
	return codeString2+codeString3(xData,yData)+codeString4(xData,yData)+codeString5+codeString6+codeString7+codeString8+codeString9;
};

const getCode = (xData, yData) => {

	const codeStr = <span>
						{codeString1}
						<strong>select the svg in which you want to plot the graph</strong>
						{codeString2}
						<strong>1. Identify Domain and Data</strong>
						{codeString3(xData,yData)}
						<strong>2. Set the maximum value of the y-axis</strong>
						{codeString4(xData,yData)}
						<strong>3. Define Scale</strong>
						{codeString5}
						<strong>4. Define Axis</strong>
						{codeString6}
						<strong>5. Append Html Elements of axis</strong>
						{codeString7}
						<strong>6. plot the bars</strong>
						{codeString8}
						<strong>7. Attach the Labels and Title</strong>
						{codeString9}
					</span>;
	return codeStr;
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