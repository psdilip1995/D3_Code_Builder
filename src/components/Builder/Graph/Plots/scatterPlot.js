import React, { useEffect } from 'react';
import * as d3 from 'd3';

//import classes from './Plot.module.css';

const plotChart = (xData, yData) => {
	let graphDiv = <div id="graph" ><svg id="chartSVG" width="450px" height="400px"></svg></div>;

	let svg = d3.select("#graph").select("#chartSVG");
	d3.select("#graph").select("#chartSVG").selectAll("*").remove();

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

	let xDomain = [xMin, xMax];
	let yDomain = [yMin, yMax];

	// 2. Define Scale
	let xScale = d3.scaleLinear().domain(xDomain).range([50,400]); // starting and ending points on svg 
	let yScale = d3.scaleLinear().domain(yDomain).range([350,50]); // starting and ending points

	// 3. Define Axis
	let xAxis = d3.axisBottom().scale(xScale);
	let yAxis = d3.axisLeft().scale(yScale);

	// 4. Creating HTML Elements
	svg.append('g').attr('transform','translate(0,350)').call(xAxis);
	svg.append('g').attr('transform','translate(50,0)').call(yAxis);

	svg.selectAll(".dot")
        .data(xData)
        .enter()
        .append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("fill", "steelblue")
        .attr("cx", function(d) { return xScale(d) })
        .attr("cy", function(d,i) { return yScale(yData[i]) })
        .attr("r", 4)
        .on('mouseover',function(d,i){
        	svg.append("text")
	            .text("x:"+d+" - y:"+yData[i])
	            .attr("id",() => 'val'+i)
	            .attr("x",function(){ return xScale(d)-10})
	            .attr("y",function(){ return yScale(yData[i])-10 });

        	d3.select(this).attr("fill","red");
        })
        .on('mouseout',function(d,i){
        	d3.select("#val"+i).remove();
        	d3.select(this).attr("fill","steelblue");
        });

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

	return graphDiv;
};

const Graph = props => {

	useEffect(()=>{plotChart(props.xData, props.yData)},[]);

	return plotChart(props.xData, props.yData);
};

export default Graph;