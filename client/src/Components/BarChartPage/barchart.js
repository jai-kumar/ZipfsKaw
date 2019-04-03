import React, { Component } from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3';
import '../../App.css';

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }
    
  drawChart() {
    const data = JSON.parse(this.props.chartdata);
    var w = 1000, h = 400;
    const svg = d3.select("body").append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "class='col col-md-offset-1 col-md-10 col-sm-12 col-xs-12'");
                  
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 30)
        .attr("y", (d, i) => h - 10 * d.frequency)
        .attr("width", 25)
        .attr("height", (d, i) => d.frequency * 10)
        .attr("fill", "teal");

    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text((d) => d.frequency)//d.word +' - '+
        .attr("x", (d, i) => i * 30)
        .attr("y", (d, i) => h - (10 * d.frequency) - 3);
  }
        
  render(){
    return <div id="chart"></div>
  }
}
    
export default BarChart;