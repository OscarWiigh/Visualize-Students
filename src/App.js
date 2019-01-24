import React, { Component } from 'react';
import Graph from "./components/Graph"
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.handleAddClick = this.handleAddClick.bind(this);

      this.state = {
        originaldata: {},
        data: {},
        width: 960,
        height: 600,
        skill: "gsx$average"
      }
  }

  handleAddClick(skill) {
    const data = this.state.originaldata;
    var objects = [];
    for (var i = 0; i < data.feed.entry.length; i++) {
      objects[i] = {"Name": data.feed.entry[i].gsx$whatisyourfirstandlastname.$t, "Count": parseFloat(data.feed.entry[i][skill].$t),"Major": data.feed.entry[i].gsx$whatisyourmajor.$t, "Color": data.feed.entry[i].gsx$color.$t };
    }
    var dataset = {"children" : objects};
    this.setState({data: dataset});
  }

  componentDidMount() {
    const preFix = "https://spreadsheets.google.com/feeds/list/";
    const sheetID = "1qG2ZwU-Zg7GzvFW_qUi5gclqPDB5OVqEZ1pM-Jmxil8";
    const postFix = "/1/public/values?alt=json"

    const spreadheetUrl = preFix + sheetID + postFix;
    const this2 = this;
    fetch(spreadheetUrl)
      .then(result=>result.json())
      .then(function(data) {
        if (data !== undefined) {
          this2.setState({originaldata: data});
          var objects = [];
          for (var i = 0; i < data.feed.entry.length; i++) {
            objects[i] = {"Name": data.feed.entry[i].gsx$whatisyourfirstandlastname.$t, "Count": parseFloat(data.feed.entry[i][this2.state.skill].$t), "Major": data.feed.entry[i].gsx$whatisyourmajor.$t, "Color": data.feed.entry[i].gsx$color.$t };
          }
          var dataset = {"children" : objects};
          this2.setState({data: dataset});
    }
      })
  }

  render() {
    const { data } = this.state;
    if(data.children !== undefined) {
      return (
        <div id="graphContainer">
          <Graph
            width={this.state.width}
            height={this.state.height}
            data={data}
          />
          <button id="btn" onClick={() => this.handleAddClick("gsx$average")}>Average Score</button>
          <button id="btn" onClick={() => this.handleAddClick("gsx$howwouldyourateyourmathematicsskills")}>Mathematics Skills</button>
          <button id="btn" onClick={() => this.handleAddClick("gsx$howwouldyourateyourcoderepositoryskills")}>Code Repository Skills</button>
          <button id="btn" onClick={() => this.handleAddClick("gsx$howwouldyourateyourcollaborationskills")}>Collaboration Skills</button>
          <button id="btn" onClick={() => this.handleAddClick("gsx$howwouldyourateyourcommunicationskills")}>Communication Skills</button>
          <button id="btn" onClick={() => this.handleAddClick("gsx$howwouldyourateyourcomputergraphicsprogrammingskills")}>Computer Graphics Skills</button>
          <button id="btn" onClick={() => this.handleAddClick("gsx$howwouldyourateyourcomputerusageskills")}>Computer Usage Skills</button>
          <button id="btn" onClick={() => this.handleAddClick("gsx$howwouldyourateyourdrawingandartisticskills")}>Artistic Skills</button>
          <button id="btn" onClick={() => this.handleAddClick("gsx$howwouldyourateyourhuman-computerinteractionprogrammingskills")}>HCI Skills</button>
          <button id="btn" onClick={() => this.handleAddClick("gsx$howwouldyourateyourinformationvisualizationskills")}>InfoViz Skills</button>
          <button id="btn" onClick={() => this.handleAddClick("gsx$howwouldyourateyourprogrammingskills")}>Programming Skills</button>
          <button id="btn" onClick={() => this.handleAddClick("gsx$howwouldyourateyourstatisticalskills")}>Statistical Skills</button>
          <button id="btn" onClick={() => this.handleAddClick("gsx$howwouldyourateyouruserexperienceevaluationskills")}>UX Evaluation Skills</button>
        </div>
    )
    }
    else {return null}
  }
}

export default App;
