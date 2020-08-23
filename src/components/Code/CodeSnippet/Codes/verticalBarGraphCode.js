import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import classes from './Codes.module.css';
import * as actions from '../../../../store/actions';


const codeString1 = `
**********VERTICAL BAR GRAPH CODE****************

`;
//select the svg in which you want to plot the graph
const codeString2 = `
let svg = d3.select("#graph").select("#chartSVG");

`;
// 1. Identify Domain and Data
const codeString3 = (xData,yData) => {
let xD = xData.map(d => " '"+d+"' ");
//console.log(xD);
return `
let xDomain =[`+xD+`];
let data = [`+yData+`];

`
};
// 2. Set the maximum value of the y-axis
const codeString4 = yData => {
let maxVal = 0;
	for(let v in yData)
		if(parseInt(yData[v]) > maxVal)
			maxVal = parseInt(yData[v]);
let yMax = Math.ceil(maxVal/10) * 10;
return `
let yDomain = [0,`+yMax+`]; // range of values (i.e min to max)

`
};
// 3. Define Scale
const codeString5 = `
let xScale = d3.scaleBand()
                .domain(xDomain)
                .range([50,400]); // starting and ending points of x-axis on svg 
let yScale = d3.scaleLinear()
                .domain(yDomain)
                .range([350,50]); //starting and ending points of y-axis on svg

`;
// 4. Define Axis
const codeString6 =`
let xAxis = d3.axisBottom().scale(xScale);
let yAxis = d3.axisLeft().scale(yScale);

`;
// 5. Append Html Elements of axis
const codeString7 =`
svg.append('g')
	.attr('transform','translate(0,350)')
	.call(xAxis)
	.selectAll("text")
	.attr("transform","rotate(-45)")
	.style("text-anchor", "end");

svg.append('g').attr('transform','translate(50,0)').call(yAxis);

`;
// 6. plot the bars
const codeString8 = xData => {
let barWidth = (300/xData.length)*0.67;
return `
svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x",function(d,i){ return xScale(xDomain[i])+`+Math.round((barWidth/3)*100)/100+` })
    .attr("y",function(d){ return yScale(d)})
    .attr("width",`+Math.round(barWidth*100)/100+`)
    .attr("height",function(d){ return 350-yScale(d)})
    .style("fill","steelblue")
    .on('mouseover',function(d,i){
        svg.append("text")
            .text(d)
            .attr("id",() => 'val'+i)
            .attr("x",function(){ return xScale(xDomain[i])+`+Math.round((barWidth/2)*100)/100+`})
            .attr("y",function(){ return yScale(d)-25 })
        d3.select(this).attr("height",function(d){return 370-yScale(d)});
        d3.select(this).attr("y",function(d){return yScale(d)-20});
        d3.select(this).style("fill","#325d81");
    })
    .on('mouseout',function(d,i){
        d3.select("#val"+i).remove();
        d3.select(this).attr("y",function(d){return yScale(d)});
        d3.select(this).attr("height",function(d){return 350-yScale(d)});
        d3.select(this).style("fill","steelblue");
    });

`
};
// 7. Attach the Labels and Title
const codeString9 = `
svg.append("text")
    .text("Fruit Count")
    .style("font-size","1.5em")
    .attr("x",150)
    .attr("y",25);

svg.append("text")
    .text("Fruits")
    .attr("x",400)
    .attr("y",370);

svg.append("text")
    .text("Count")
    .attr("x",-210)
    .attr("y",20)
    .attr("transform","rotate(-90)");
`;

const getDownloadCode = (xData,yData) => {
    const codeStr = codeString2+codeString3(xData,yData)+codeString4(yData)+codeString5+codeString6+codeString7+codeString8(xData)+codeString9;
    //console.log(codeStr);
    return codeStr;
};

const getCode = (xData, yData) => {

	const codeStr = <span>
						{codeString1}
						<strong>select the svg in which you want to plot the graph</strong>
						{codeString2}
						<strong>1. Identify Domain and Data</strong>
						{codeString3(xData,yData)}
						<strong>2. Set the maximum value of the y-axis</strong>
						{codeString4(yData)}
						<strong>3. Define Scale</strong>
						{codeString5}
						<strong>4. Define Axis</strong>
						{codeString6}
						<strong>5. Append Html Elements of axis</strong>
						{codeString7}
						<strong>6. plot the bars</strong>
						{codeString8(xData)}
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