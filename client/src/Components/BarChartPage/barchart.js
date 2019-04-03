import React, { Component } from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3';
import '../../App.css';

/*class Barchart extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        /*const width = 800;
        const height = 450;
        const el = new Element('div');
        const svg = d3.select(el)
            .append('svg')
            .attr('id', 'chart')
            .attr('width', width)
            .attr('height', height);

        return el.toReact();
        const data = [12, 5, 6, 6, 9, 10];
        const svg = d3.select("body").append("svg").attr("width", 700).attr("height", 300);
        //svg.selectAll("rect").data(data).enter().append("rect");
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", 0)
            .attr("width", 25)
            .attr("height", (d, i) => d)
            .attr("fill", "green");
    }
    
    /*render() {
        return this.drawChart();
    }*/
//}

//export default Barchart;*/

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }
    
  drawChart() {
    const data = this.props.cdata;
    var w = 700, h = 300;
    const svg = d3.select("body").append("svg")
        .attr("width", w)
        .attr("height", h);

    console.log(JSON.stringify(data));
                  
    svg.selectAll("rect")
        .data(data.frequency)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => h - 10 * d)//.frequency)
        .attr("width", 65)
        .attr("height", (d, i) => d * 1)
        .attr("fill", "green");

    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text((d) => d.word)
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => h - (10 * d.frequency) - 3);
  }
        
  render(){
    return <div id="chart"></div>
  }
}
    
export default BarChart;