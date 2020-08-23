import React, { useEffect } from 'react';
import * as d3 from 'd3';

//import classes from './Plot.module.css';

const plotChart = (xData, yData) => {
	let graphDiv = <div id="graph" ><svg id="chartSVG" width="450px" height="400px"></svg></div>;

	let svg = d3.select("#graph").select("#chartSVG");
	d3.select("#graph").select("#chartSVG").selectAll("*").remove();	

	// 1. Identify Domain
	//let yDomain = ['kiwi','apple','banana','grapes','oranges'];
	let yDomain = xData;
	let maxVal = 0;
	for(let v in yData)
		if(parseInt(yData[v]) > maxVal)
			maxVal = parseInt(yData[v]);
	let yMax = Math.ceil(maxVal/10) * 10;

	// 2. Define Scale
	let yScale = d3.scaleBand().domain(yDomain).range([350,50]); //starting and ending points

	// 3. Define Axis
	let yAxis = d3.axisLeft().scale(yScale);

	//let data = [57,24,98,67,12];
	let data = yData;
	const barWidths = [...data];
    for(let d in data)
        barWidths[d] = 350*data[d]/yMax;

    let eachItemSpace = 300/(data.length);
    let barHeight = eachItemSpace*0.67;

	// 4. Creating Html Elements for axis
	svg.append('g').attr('transform','translate(50,0)').call(yAxis);

	const onHoverColor = "#325d81";
	// 5. plot the bars
	svg.selectAll(".bar")
	    .data(yDomain)
	    .enter()
	    .append("rect")
	    .attr("x",50)
	    .attr("y",function(d){ return yScale(d)+(eachItemSpace/6)})
	    .attr("width",function(d,i){ return barWidths[i]})
	    .attr("height",barHeight)
	    .style("fill","steelblue")
	    .on('mouseover',function(d,i){
            svg.append("text")
                .text(data[i])
                .attr("id",() => 'val'+i)
                .attr("x",function(){ return barWidths[i]+55})
                .attr("y",function(){ return yScale(d)+(eachItemSpace/2) });
            d3.select(this).style("fill",onHoverColor);
        })
        .on('mouseout',function(d,i){
            d3.select("#val"+i).remove();
            d3.select(this).style("fill","steelblue");
            d3.select(this)
                .attr("x",50)
                .attr("y",function(d){ return yScale(d)+(eachItemSpace/6)})
                .attr("height",barHeight)
        });

	svg.append("text")
	    .text("Fruit Count")
	    .style("font-size","1.5em")
	    .attr("x",150)
	    .attr("y",25);

	svg.append("text")
        .text("Count")
        .attr("x",150)
        .attr("y",370);

    svg.append("text")
        .text("Fruit")
        .attr("x",25)
        .attr("y",35);

	return graphDiv;
};

const Graph = props => {
	useEffect(()=>{plotChart(props.xData, props.yData)},[]);
	return plotChart(props.xData, props.yData);
};
//
export default Graph;