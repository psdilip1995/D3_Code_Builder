import React, { useEffect } from 'react';
import * as d3 from 'd3';

//import classes from './Plot.module.css';

const plotChart = (xData, yData) => {
	let graphDiv = <div id="graph" ><svg id="chartSVG" width="450px" height="400px"></svg></div>;

	let svg = d3.select("#graph").select("#chartSVG");
	d3.select("#graph").select("#chartSVG").selectAll("*").remove();

	// 1. Identify Domain
	let xDomain = xData;
	let maxVal = 0;
	for(let v in yData)
		if(parseInt(yData[v]) > maxVal)
			maxVal = parseInt(yData[v]);
	let yMax = Math.ceil(maxVal/10) * 10;
	let yDomain = [0,yMax]; // range of values (i.e min to max)

	// 2. Define Scale
	let xScale = d3.scaleBand().domain(xDomain).range([50,400]); // starting and ending points on svg 
	let yScale = d3.scaleLinear().domain(yDomain).range([350,50]); //starting and ending points

	// 3. Define Axis
	let xAxis = d3.axisBottom().scale(xScale);
	let yAxis = d3.axisLeft().scale(yScale);

	//let data = [57,24,98,67,12];
	let data = yData;

	// 4. Creating Html Elements for axis
	svg.append('g')
		.attr('transform','translate(0,350)')
		.call(xAxis)
		.selectAll("text")
		.attr("transform","rotate(-45)")
		.style("text-anchor", "end");
	svg.append('g').attr('transform','translate(50,0)').call(yAxis);

	let addWidth = Math.round((350/xData.length)*100)/100;

	svg.append("path")
        .datum(yData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
        .attr("d", d3.line()
          .x(function(d,i) { return xScale(xData[i])+(addWidth/2) })
          .y(function(d) { return yScale(d) })
        );

    svg.selectAll(".dot")
        .data(xData)
        .enter()
        .append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("fill", "steelblue")
        .attr("cx", function(d) { return xScale(d)+(addWidth/2) })
        .attr("cy", function(d,i) { return yScale(yData[i]) })
        .attr("r", 4)
        .on('mouseover',function(d,i){
        	svg.append("text")
	            .text(d+":"+yData[i])
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

	return graphDiv;
};

const Graph = props => {

	useEffect(()=>{plotChart(props.xData, props.yData)},[]);

	return plotChart(props.xData, props.yData);
};

export default Graph;