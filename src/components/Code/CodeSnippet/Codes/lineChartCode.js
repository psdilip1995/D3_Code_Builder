import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import classes from './Codes.module.css';
import * as actions from '../../../../store/actions';


const codeString1 = `
**********Line GRAPH CODE****************


`;

//select the svg in which you want to plot the graph
const codeString2 = `
let svg = d3.select("#graph").select("#chartSVG");

`;
// 1. Identify Domain
const codeString3 = (xData,yData) => {
let xD = xData.map(d => " '"+d+"' ");
let maxVal = 0;
for(let v in yData)
	if(parseInt(yData[v]) > maxVal)
		maxVal = parseInt(yData[v]);
let yMax = Math.ceil(maxVal/10) * 10;

//console.log(xD);
return `
let xDomain = [`+xD+`];
let yDomain = [0, `+yMax+`]; // range of values (i.e min to max)

`
};

// 2. Identify Data
const codeString4 = yData => {
return `
let data = [`+yData+`]; // range of values (i.e min to max)

`
};

// 3. Define Scale
const codeString5 = `
let xScale = d3.scaleBand().domain(xDomain).range([50,400]); // starting and ending points on svg 
let yScale = d3.scaleLinear().domain(yDomain).range([350,50]); //starting and ending points

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
let addWidth = Math.round((350/xData.length)*100)/100;
return `
svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2.5)
    .attr("d", d3.line()
      .x(function(d,i) { return xScale(xDomain[i])+`+(addWidth/2)+` })
      .y(function(d) { return yScale(d) })
    );

svg.selectAll(".dot")
    .data(xDomain)
    .enter()
    .append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("fill", "steelblue")
    .attr("cx", function(d) { return xScale(d)+`+(addWidth/2)+` })
    .attr("cy", function(d,i) { return yScale(data[i]) })
    .attr("r", 4)
    .on('mouseover',function(d,i){
    	svg.append("text")
            .text(d+":"+data[i])
            .attr("id",() => 'val'+i)
            .attr("x",function(){ return xScale(d)-10})
            .attr("y",function(){ return yScale(data[i])-10 });

    	d3.select(this).attr("fill","red");
    })
    .on('mouseout',function(d,i){
    	d3.select("#val"+i).remove();
    	d3.select(this).attr("fill","steelblue");
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
    .text("Fruit")
    .attr("x",400)
    .attr("y",370);

svg.append("text")
    .text("Count")
    .attr("x",-210)
    .attr("y",20)
    .attr("transform","rotate(-90)");
`;


const getDownloadCode = (xData,yData) => {
	return codeString2+codeString3(xData,yData)+codeString4(yData)+codeString5+codeString6+codeString7+codeString8(xData)+codeString9;
};

const getCode = (xData, yData) => {

	const codeStr = <span>
						{codeString1}
						<strong>select the svg in which you want to plot the graph</strong>
						{codeString2}
						<strong>1. Identify Domain</strong>
						{codeString3(xData,yData)}
						<strong>2. Identify Data</strong>
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