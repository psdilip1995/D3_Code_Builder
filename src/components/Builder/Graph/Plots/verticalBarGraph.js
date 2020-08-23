import React, { useEffect } from 'react';
import * as d3 from 'd3'; 

const plotChart = (xData, yData) => {
	let graphDiv = <div id="graph" ><svg id="chartSVG" width="450px" height="400px"></svg></div>;

	let svg = d3.select("#graph").select("#chartSVG");
	d3.select("#graph").select("#chartSVG").selectAll("*").remove();	

	// 1. Identify Domain
	//let xDomain = ['kiwi','apple','banana','grapes','oranges'];
	let xDomain = xData;
	let maxVal = 0;
	//console.log(yData);
	for(let v in yData)
		if(parseInt(yData[v]) > maxVal)
			maxVal = parseInt(yData[v]);
	let yMax = Math.ceil(maxVal/10) * 10;
	//console.log(maxVal);
	let yDomain = [0,yMax]; // range of values (i.e min to max)

	// 2. Define Scale
	let xScale = d3.scaleBand()
	                .domain(xDomain)
	                .range([50,400]); // starting and ending points on svg 
	let yScale = d3.scaleLinear()
	                .domain(yDomain)
	                .range([350,50]); //starting and ending points

	// 3. Define Axis
	let xAxis = d3.axisBottom().scale(xScale);
	let yAxis = d3.axisLeft().scale(yScale);

	//let data = [57,24,98,67,12];
	let data = yData;

	// 4. Creating Html Elements for axis
	//let xAxisElement = 
	svg.append('g')
		.attr('transform','translate(0,350)')
		.call(xAxis)
		.selectAll("text")
		.attr("transform","rotate(-45)")
		.style("text-anchor", "end");
	//let yAxisElement = 
	svg.append('g').attr('transform','translate(50,0)').call(yAxis);

	let barWidth = (300/xData.length)*0.67;

	const onHoverHeightChange = 20;
	const onHoverColor = "#325d81";
	// plot the bars
	svg.selectAll(".bar")
	    .data(data)
	    .enter()
	    .append("rect")
	    .attr("x",function(d,i){ return xScale(xDomain[i]) ? xScale(xDomain[i])+barWidth/3 : -200})
	    .attr("y",function(d){ return yScale(d)})
	    .attr("width",barWidth)
	    .attr("height",function(d){ return 350-yScale(d)})
	    .style("fill","steelblue")
	    .on('mouseover',function(d,i){
	        svg.append("text")
	            .text(d)
	            .attr("id",() => 'val'+i)
	            .attr("x",function(){ return xScale(xDomain[i])+barWidth/2})
	            .attr("y",function(){ return yScale(d)-5-onHoverHeightChange })

	        d3.select(this).attr("height",function(d){return 350-yScale(d)+onHoverHeightChange});
	        d3.select(this).attr("y",function(d){return yScale(d)-onHoverHeightChange});
	        d3.select(this).style("fill",onHoverColor);
	    })
	    .on('mouseout',function(d,i){
	        d3.select("#val"+i).remove();
	        d3.select(this).attr("y",function(d){return yScale(d)});
	        d3.select(this).attr("height",function(d){return 350-yScale(d)});
	        d3.select(this).style("fill","steelblue");
	    });

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

	return graphDiv;
};



const Graph = props => {

	// console.log(props.xData);
	// console.log(props.yData);
	// const graphDiv = <div id="graph" className={classes.Plot}></div>;
	useEffect(()=>{plotChart(props.xData, props.yData)},[]);

	return plotChart(props.xData, props.yData);
};

export default Graph;