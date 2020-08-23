import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import classes from './Codes.module.css';
import * as actions from '../../../../store/actions';
import * as d3 from 'd3';

const codeString1 = `
**********HISTOGRAM CODE****************


Code will come here!
`;

const codeString2 = `
let svg = d3.select("#graph").select("#chartSVG");

`;
// 1. Identify Range of Data and create bins
const codeString3 = (hData) => {

let min = hData[0];
let max = hData[0];
for(let i in hData){
	max = Math.max(hData[i],max);
	min = Math.min(hData[i],min);
}

max = Math.ceil(max/20)*20;
min = Math.floor(min/20)*20;

let xScale = d3.scaleLinear().domain([min,max]).range([50,400]);
let hist = d3.histogram().domain([min,max]).thresholds(xScale.ticks(5));
let bins = hist(hData);

let maxY = 0;
bins.forEach(function(d){
	if(d.length > maxY)
		maxY = d.length;
});

return `
let xScale = d3.scaleLinear().domain([`+min+`,`+max+`]).range([50,400]); // create X Scale
let hist = d3.histogram().domain([`+min+`,`+max+`]).thresholds(xScale.ticks(5)); // create d3 histogram
let bins = hist([`+hData+`]); // d3 will automatically divide the range into bins and return them 

let yScale = d3.scaleLinear().domain([0,`+(Math.ceil(maxY/10) * 10)+`]).range([350,50]); // create Y Scale
`
};

// 3. Define Axis
const codeString5 = `
let xAxis = d3.axisBottom().scale(xScale);
let yAxis = d3.axisLeft().scale(yScale);

`;

// 4. Creating Html Elements for axis
const codeString7 = `
svg.append('g').attr('transform','translate(0,350)').call(xAxis);
svg.append('g').attr('transform','translate(50,0)').call(yAxis);

`;
// 5. plot the bars
const codeString8 = `
svg.selectAll(".bar")
	.data(bins)
	.enter()
	.append("rect")
	.on("mouseover",function(){
		d3.select(this).style("fill","#325d81");
		svg.append("text")
			.attr("class","val")
			.attr("x",(d3.select(this).attr("x"))-(-10))
			.attr("y",d3.select(this).attr("y")-5)
			.text(d3.select(this).attr("yval"));
	})
	.on("mouseleave",function(){
		d3.select(this).style("fill","steelblue");
		svg.select(".val").remove();
		svg.select(".numLable").remove();
	})
	.style("fill","steelblue")
	.attr("x",function(d){ return xScale(d.x0);})
	.attr("width",function(d){return xScale(d.x1)-xScale(d.x0)})
	.attr("y",function(d){ return yScale(d.length)})
	.attr("height",function(d){ return 350-yScale(d.length)})
	.attr("yval",function(d){return d.length});

`;

const codeString9 = `
svg.append("text")
    .text("Histogram")
    .style("font-size","1.5em")
    .attr("x",150)
    .attr("y",25);

svg.append("text")
    .text("Range")
    .attr("x",350)
    .attr("y",390);

svg.append("text")
    .text("Frequency")
    .attr("x",-210)
    .attr("y",20)
    .attr("transform","rotate(-90)");
`;


const getDownloadCode = (hData) => {
	return codeString2+codeString3(hData)+codeString5+codeString7+codeString8+codeString9;
};


const getCode = (hData) => {

	const codeStr = <span>
						{codeString1}
						<strong>select the svg in which you want to plot the graph</strong>
						{codeString2}
						<strong>1. Identify Range of Data and create bins, Scale</strong>
						{codeString3(hData)}
						<strong>2. Define Axis</strong>
						{codeString5}
						<strong>3. Append Html Elements of axis</strong>
						{codeString7}
						<strong>4. plot the bars</strong>
						{codeString8}
						<strong>5. Attach the Labels and Title</strong>
						{codeString9}
					</span>;
	return codeStr;
};
//
const Code = props => {

    useEffect(()=>{
        props.onMount(getDownloadCode(props.hData));
    });

	return (
		<span className={classes.Codes}>
			{getCode(props.hData)}
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