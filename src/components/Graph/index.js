import React from "react"
import "./graph.css";
import * as d3 from 'd3';
import * as ReactFauxDOM from 'react-faux-dom'


class Graph extends React.Component {

  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this)

  }

  componentDidMount() {
    const { data } = this.props;
    this.drawChart(data)
  }
  componentWillReceiveProps({ data }) {
    this.updateChart(data)
  }
  shouldComponentUpdate() {
    return false;
  }

  updateChart(dataset) {
    var diameter = 800;
    var nodes = d3.hierarchy(dataset)
      .sum(function (d) { return d.Count; });

      var bubble = d3.pack(dataset)
      .size([diameter, diameter])
      .padding(1.5);

    var node = d3.selectAll(".node").data(bubble(nodes).descendants()).filter(function (d) {
      return !d.children
    }).transition().attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    }).select("circle").attr("r", function (d) {
      return d.r
    }).duration(1000);

    node.select("circle").transition().attr("r", function (d) {
      return d.r;
    }).duration(200);

    //node.select("#tHarry Potter ").attr("font-size", 15)
  }

  drawChart(dataset) {
    d3.selectAll("svg").remove();

    var diameter = 800;

    var bubble = d3.pack(dataset)
      .size([diameter, diameter])
      .padding(1.5);

    var svg = d3.select("#chart")
      .append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");

    var nodes = d3.hierarchy(dataset)
      .sum(function (d) { return d.Count; });

    var node = svg.selectAll(".node")
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function (d) {
        return !d.children
      })
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    node.append("circle")
      .attr("r", function (d) {
        return d.r;
      })
      .on("click", function (d) {
        if (d3.select(this).style('fill') !== 'orange') {
          d3.select(this).style("fill", "orange");
        }
        else {
          d3.select(this).style("fill", d.data.Color)
        }
      })
      .style("fill", function (d) {
        return d.data.Color;
      })
      ;

    node.append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function (d) {
        return d.data.Name.substring(0, d.r / 3);
      })
      .attr("id", function (d){ return "t" + d.data.Name})
      .attr("font-family", "sans-serif")
      .attr("font-size", function (d) {
        return d.r / 5;
      })
      .attr("fill", "white");

    node.append("text")
      .attr("dy", "1.3em")
      .style("text-anchor", "middle")
      .text(function (d) {
        return d.data.Count;
      })
      .attr("font-family", "Gill Sans", "Gill Sans MT")
      .attr("font-size", function (d) {
        return d.r / 5;
      })
      .attr("fill", "white");
  }

  render() {
    return (
      <div id="chart" />
    );
  }
}

export default Graph;