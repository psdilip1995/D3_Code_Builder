import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import classes from './Codes.module.css';
import * as actions from '../../../../store/actions';


const codeString1 = `
**********HORIZONTAL BAR GRAPH CODE****************

`;

const codeString2 = `
let svg = d3.select("#graph").select("#chartSVG");

`;
// 1. Identify Domain
//let yDomain = ['kiwi','apple','banana','grapes','oranges'];
const codeString3 = (xData) => {
let xD = xData.map(d => " '"+d+"' ");
return `
let yDomain = [`+xD+`];

`
};

// 2. Define Scale
const codeString4 =`
let yScale = d3.scaleBand().domain(yDomain).range([350,50]); //starting and ending points

`;
// 3. Define Axis
const codeString5 = `
let yAxis = d3.axisLeft().scale(yScale);

`;
//let data = [57,24,98,67,12];
const codeString6 = (yData) => {
return `
let data = [`+yData+`];

`
};

// 4. Creating Html Elements for axis
const codeString7 = `
svg.append('g').attr('transform','translate(50,0)').call(yAxis);

`;
// 5. plot the bars
const codeString8 = (xData, yData) => {

let maxVal = 0;
for(let v in yData)
	if(parseInt(yData[v]) > maxVal)
		maxVal = parseInt(yData[v]);
let yMax = Math.ceil(maxVal/10) * 10;


const barWidths = [...yData];
for(let d in yData)
    barWidths[d] = 350*yData[d]/yMax;

let eachItemSpace = 300/(yData.length);
let barHeight = eachItemSpace*0.67;

const barWidths2 = barWidths.map(bw => Math.round(bw*100)/100);

return `

let barWidths = [`+barWidths2.toString()+`];

svg.selectAll(".bar")
	    .data(yDomain)
	    .enter()
	    .append("rect")
	    .attr("x",50)
	    .attr("y",function(d){ return yScale(d)+`+Math.round((eachItemSpace/6)*100)/100+`})
	    .attr("width",function(d,i){ return barWidths[i]})
	    .attr("height",`+Math.round(barHeight*100)/100+`)
	    .style("fill","steelblue")
	    .on('mouseover',function(d,i){
            svg.append("text")
                .text(data[i])
                .attr("id",() => 'val'+i)
                .attr("x",function(){ return barWidths[i]+55})
                .attr("y",function(){ return yScale(d)+`+Math.round((eachItemSpace/2)*100)/100+` });
            d3.select(this).style("fill","#325d81");
        })
        .on('mouseout',function(d,i){
            d3.select("#val"+i).remove();
            d3.select(this).style("fill","steelblue");
            d3.select(this)
                .attr("x",50)
                .attr("y",function(d){ return yScale(d)+`+Math.round((eachItemSpace/6)*100)/100+`})
                .attr("height",`+Math.round(barHeight*100)/100+`)
        });

`
};
const codeString9 = `
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
`;

const getDownloadCode = (xData,yData) => {
	return codeString2+codeString3(xData)+codeString4+codeString5+codeString6(yData)+codeString7+codeString8(xData,yData)+codeString9;
};

const getCode = (xData, yData) => {

	const codeStr = <span>
						{codeString1}
						<strong>select the svg in which you want to plot the graph</strong>
						{codeString2}
						<strong>1. Identify Y-Axis Domain</strong>
						{codeString3(xData)}
						<strong>2. Define Scale</strong>
						{codeString4}
						<strong>3. Define Axis</strong>
						{codeString5}
						<strong>4. Identify X-Axis Data</strong>
						{codeString6(yData)}
						<strong>5. Append Html Element of Y-Axis</strong>
						{codeString7}
						<strong>6. plot the bars</strong>
						{codeString8(xData,yData)}
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