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
        width: 900,
        height: 600,
        skill: "gsx$howwouldyourateyourinformationvisualizationskills"
      }
  }

  handleAddClick(skill, element) {
    var buttons = (document.getElementsByClassName("btn"));
		for (var j = 0; j < buttons.length; j++) { 
    		buttons[j].className = "btn";
    }
    document.getElementById(element.target.id).className = "btn default";
    const data = this.state.originaldata;
    var objects = [];
    for (var i = 0; i < data.feed.entry.length; i++) {
      objects[i] = {"Name": data.feed.entry[i].gsx$whatisyourfirstandlastname.$t, "Count": parseFloat(data.feed.entry[i][skill].$t),"Major": data.feed.entry[i].gsx$whatisyourmajor.$t, "Interest": data.feed.entry[i].gsx$interest.$t, "Degree": data.feed.entry[i].gsx$whatdegreeareyoupursuing.$t, "Average": data.feed.entry[i].gsx$average.$t, "Color": data.feed.entry[i].gsx$color.$t };
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
            objects[i] = {"Name": data.feed.entry[i].gsx$whatisyourfirstandlastname.$t, "Count": parseFloat(data.feed.entry[i][this2.state.skill].$t), "Major": data.feed.entry[i].gsx$whatisyourmajor.$t, "Interest": data.feed.entry[i].gsx$interest.$t, "Degree": data.feed.entry[i].gsx$whatdegreeareyoupursuing.$t, "Average": data.feed.entry[i].gsx$average.$t, "Color": data.feed.entry[i].gsx$color.$t };
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
          <div id="header">
            <h1 id="headertitle">Visualizing Students</h1>
            <h2 id="headerauthor">By Oscar Wiigh</h2>
            <p id="headerparagraph">Below is a Bubble Chart that represents the skills of students enrolled in the course Information Visualization VT19 @KTH.<br/>Each bubble corresponds with a student and it's size reflects their self-estimated skill level in a certain area.<br/>Explore different skill areas of clicking on the adjacents buttons above the chart.<br/> Pan and zoom by either double clicking or scrolling to a desired point.<br/>The color of each bubble represents the main interest of the student.<br/>Click on a bubble to add a student to the table below and gain more information about him/her. <br/> Click on the same bubble again to remove it. </p>
          </div>
          <div id="buttoncontainer">
          <button className="btn" id="math" onClick={(e) => this.handleAddClick("gsx$howwouldyourateyourmathematicsskills", e)}>Mathematics Skills</button>
          <button className="btn" id ="code" onClick={(e) => this.handleAddClick("gsx$howwouldyourateyourcoderepositoryskills", e)}>Code Repository Skills</button>
          <button className="btn" id="collab" onClick={(e) => this.handleAddClick("gsx$howwouldyourateyourcollaborationskills", e)}>Collaboration Skills</button>
          <button className="btn" id="comm" onClick={(e) => this.handleAddClick("gsx$howwouldyourateyourcommunicationskills", e)}>Communication Skills</button>
          <button className="btn" id ="CG" onClick={(e) => this.handleAddClick("gsx$howwouldyourateyourcomputergraphicsprogrammingskills", e)}>Computer Graphics Skills</button>
          <button className="btn" id="computer" onClick={(e) => this.handleAddClick("gsx$howwouldyourateyourcomputerusageskills", e)}>Computer Usage Skills</button>
          <button className="btn" id="artskills" onClick={(e) => this.handleAddClick("gsx$howwouldyourateyourdrawingandartisticskills", e)}>Artistic Skills</button>
          <button className="btn" id="HCI" onClick={(e) => this.handleAddClick("gsx$howwouldyourateyourhuman-computerinteractionprogrammingskills", e)}>HCI Skills</button>
          <button className="btn default" id="infoviz" onClick={(e) => this.handleAddClick("gsx$howwouldyourateyourinformationvisualizationskills", e)}>InfoViz Skills</button>
          <button className="btn" id="program" onClick={(e) => this.handleAddClick("gsx$howwouldyourateyourprogrammingskills", e)}>Programming Skills</button>
          <button className="btn" id ="stat" onClick={(e) => this.handleAddClick("gsx$howwouldyourateyourstatisticalskills", e)}>Statistical Skills</button>
          <button className="btn" id="UX" onClick={(e) => this.handleAddClick("gsx$howwouldyourateyouruserexperienceevaluationskills", e)}>UX Evaluation Skills</button>
          </div>
          <Graph
            width={this.state.width}
            height={this.state.height}
            data={data}
          />
        </div>
    )
    }
    else {return <p>Loading</p>}
  }
}

export default App;
