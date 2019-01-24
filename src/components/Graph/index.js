import React from "react"
import "./graph.css";
import * as d3 from 'd3';
import SimpleTable from "../SimpleTable"


class Graph extends React.Component {

  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this)
    this.addPerson = this.addPerson.bind(this)
    this.removePerson = this.removePerson.bind(this)

    this.state = {
      selectedpersons: []
    }

  }

  componentDidMount() {
    const { data } = this.props;
    this.drawChart(data)
  }
  componentWillReceiveProps({ data }) {
    this.updateChart(data)
  }
  // shouldComponentUpdate() {
  //   return false;
  // }

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
    });


    node.select("circle").transition().attr("r", function (d) {
      return d.r;
    }).duration(500);

    node.select(".nameText").transition().attr("font-size", function (d) {
      return d.r / 5;
    }).duration(500)

    node.select(".countText").transition().text(function (d) {
      return d.data.Count;
    }).attr("font-size", function (d) {
      return d.r / 5;
    }).duration(0)
  }

  addPerson(pers) {
    this.setState({
      selectedpersons: [...this.state.selectedpersons, pers]
    })
  }

  removePerson(pers) {
    const persons = this.state.selectedpersons;
    var filteredArray = persons.filter(e => e.Name !== pers.Name)
    this.setState({
      selectedpersons: filteredArray
    })
  }

  drawChart(dataset) {

    const this2 = this;


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
          d3.select(this).style("fill", "orange")
          this2.addPerson(d.data)
        }
        else {
          d3.select(this).style("fill", d.data.Color)
          this2.removePerson(d.data)
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
        var firstname = d.data.Name.split(" ")[0];
        var lastname = d.data.Name.split(" ")[1][0] + ".";
        var name = [firstname, lastname]
        return name.join(" ")
      })
      .attr("class", "nameText")
      .attr("font-family", "sans-serif")
      .attr("font-size", function (d) {
        return d.r / 5;
      })
      .attr("fill", "white");

    node.append("text")
      .attr("dy", "1.3em")
      .attr("class", "countText")
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
    return (<div><div id="chart" /><SimpleTable data={this.state.selectedpersons}/></div>
      
      );
  }
}

export default Graph;