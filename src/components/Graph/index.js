import React from "react"
import "./graph.css";
import * as d3 from 'd3';
import * as ReactFauxDOM from 'react-faux-dom'

 
class Graph extends React.Component {

  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this)

    this.state = {
      data: [],
      skill: "gsx$howwouldyourateyourcollaborationskills"
      
    }
}

componentDidUpdate() {
  if (this.state.data.length !== 0) {
    this.drawChart()
    }
}

componentWillReceiveProps(nextProps) {
  const data = nextProps.data;
    if (data !== undefined) {
      var objects = [];
      for (var i = 0; i < data.length; i++) {
        objects[i] = {"Name": data[i].gsx$whatisyourfirstandlastname.$t, "Count": parseInt(data[i][this.state.skill].$t), "Color": data[i].gsx$color.$t };
      }

      var dataset = {"children" : objects};
      this.setState({data: dataset});
}
}

  drawChart() {
    

    const div = new ReactFauxDOM.createElement('div');
    const dataset = this.state.data;

    var diameter = 800;

    var bubble = d3.pack(dataset)
      .size([diameter, diameter])
      .padding(1.5);

    var svg = d3.select(div)
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
      

    node.append("title")
      .text(function (d) {
        return d.data.Name + ": " + d.data.Count;
      });

    node.append("circle")
      .attr("r", function (d) {
        return d.r;
      })
      .style("fill", function (d) {
        return d.data.Color;
      });

    node.append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function (d) {
        return d.data.Name.substring(0, d.r / 3);
      })
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

    //DOM manipulations done, convert to React
    return div.toReact()
  }
 
  render () {
    if(this.state.data.length !== 0) {
      return this.drawChart();
    }
    else {return "Loading"}
    
  }
}

export default Graph;