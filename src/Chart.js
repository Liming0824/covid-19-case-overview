import React, { Component } from 'react';
import logo from './logo.svg';
import * as d3 from 'd3';
import chroma from 'chroma-js';
import './Chart.css';

const width = 650;
const height = 400;
const margin = {top: 20, right: 5, bottom: 20, left: 35};
const red = '#eb6a5b';
const green = '#b6e86f';
const blue = '#52b6ca';
const colors = chroma.scale([blue, green, red]);

class Chart extends Component{
    state = {
      hights: null,
      lows: null,
    }

    xScale = d3.scaleTime().range([margin.left, width - margin.right]);
    yScale = d3.scaleLinear().range([0, width/2]);
    xAxis = d3.axisBottom().scale(this.xScale).tickFormat(d3.timeFormat('%d'));
    yAxis = d3.axisLeft().scale(this.yScale).tickFormat(d => `${d}°F`)
    lineGenerator = d3.line().curve(d3.curveCardinal);
    lineGenerator = d3.line().curve(d3.curveCardinal);

    componentWillReceiveProps(nextProps){
      const {data} = nextProps;
      if(!data){return;}

      const timeDomain = d3.extent(data, d => d.date);
      const tempMax = d3.max(data, d => d.hight);
      this.xScale.domain(timeDomain);
      this.yScale.domain([0, tempMax]);
      this.lineGenerator.x(d => this.xScale(d.date))
      this.lineGenerator.y(d => this.yScale(d.hight));
      let hights = this.lineGenerator(data);

      this.lineGenerator.y(d => this.yScale(d.low));
      let lows = this.lineGenerator(data);
      this.setState({hights, lows})
    }



  render(){
    return (
      <div></div>
      // <svg width={width} height={height}>
      //   <path  stroke={red} d={this.state.hights} fill='none'/>
      //   <path  stroke={blue} d={this.state.lows} fill='none'/>
      // </svg>
    );
  }
}

export default Chart;
