import React, { useEffect } from 'react';
import * as d3 from 'd3';

//import classes from './Plot.module.css';

const plotChart = (hData) => {
	let graphDiv = <div id="graph" ><svg id="chartSVG" width="450px" height="400px"></svg></div>;

	let svg = d3.select("#graph").select("#chartSVG");
	d3.select("#graph").select("#chartSVG").selectAll("*").remove();

	let min = hData[0];
	let max = hData[0];
	for(let i in hData){
		max = Math.max(hData[i],max);
		min = Math.min(hData[i],min);
	}

	max = Math.ceil(max/20)*20;
	min = Math.floor(min/20)*20;
	//console.log(max,min);

	let xScale = d3.scaleLinear().domain([min,max]).range([50,400]);
	let hist = d3.histogram().domain([min,max]).thresholds(xScale.ticks(5));
	let bins = hist(hData);
	//console.log(bins);
	let maxY = 0;
	bins.forEach(function(d){
		if(d.length > maxY)
			maxY = d.length;
	});

	let yScale = d3.scaleLinear().domain([0,Math.ceil(maxY/10) * 10]).range([350,50]);

	// 3. Define Axis
	let xAxis = d3.axisBottom().scale(xScale);
	let yAxis = d3.axisLeft().scale(yScale);

	// 4. Creating Html Elements for axis
	svg.append('g').attr('transform','translate(0,350)').call(xAxis);
	svg.append('g').attr('transform','translate(50,0)').call(yAxis);

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
		// .attr("y",function(d){ return yScale(0)-80;})
		// .attr("height",0)
		// .transition()
		// .duration(500)
		.attr("y",function(d){ return yScale(d.length)})
		.attr("height",function(d){ return 350-yScale(d.length)})
		.attr("yval",function(d){return d.length});


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

	return graphDiv;
};

const Graph = props => {

	useEffect(()=>{plotChart(props.hData)},[]);

	return plotChart(props.hData);
};

export default Graph;