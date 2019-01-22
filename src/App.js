import React, { Component } from 'react';
import Graph from "./components/Graph"
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.handleAddClick = this.handleAddClick.bind(this);

      this.state = {
        data: {},
        width: 960,
        height: 600,
        skill: "gsx$howwouldyourateyourcollaborationskills"
      }
  }

  handleAddClick() {
    const datastuff = {"children" : [
      { Name: "Hannah Abbott ", Count: 3, Color: "red" },
      { Name: "Ludo Bagman ", Count: 8, Color: "green" },
      { Name: "Bathilda Bagshot ", Count: 7, Color: "blue" },
      { Name: "Katie Bell ", Count: 5, Color: "red" },
      { Name: "Cuthbert Binns", Count: 5, Color: "green" },
      { Name: "Phineas Nigellus Black", Count: 8, Color: "blue" },
      { Name: "Sirius Black", Count: 5, Color: "red" },
      { Name: "Amelia Bones ", Count: 7, Color: "green" },
      { Name: "Susan Bones ", Count: 6, Color: "red" },
      { Name: "Terry Boot", Count: 3, Color: "green" },
      { Name: "Lavender Brown", Count: 9, Color: "blue" },
      { Name: "Millicent Bulstrode", Count: 7, Color: "red" },
      { Name: "Charity Burbage", Count: 10, Color: "green" },
      { Name: "Frank Bryce", Count: 3, Color: "blue" },
      { Name: "Alecto Carrow", Count: 9, Color: "red" },
      { Name: "Amycus Carrow", Count: 7, Color: "green" },
      { Name: "Reginald Cattermole", Count: 7, Color: "red" },
      { Name: "Mary Cattermole ", Count: 2, Color: "green" },
      { Name: "Cho Chang ", Count: 9, Color: "blue" },
      { Name: "Penelope Clearwater ", Count: 8, Color: "red" },
      { Name: "Michael Corner", Count: 6, Color: "green" },
      { Name: "Vincent Crabbe", Count: 9, Color: "blue" },
      { Name: "Colin Creevey", Count: 2, Color: "red" },
      { Name: "Fleur Delacour ", Count: 9, Color: "blue" },
      { Name: "Amos Diggory", Count: 7, Color: "red" },
      { Name: "Albus Dumbledore", Count: 8, Color: "green" },
      { Name: "Seamus Finnigan", Count: 9, Color: "blue" },
      { Name: "Marcus Flint", Count: 5, Color: "red" },
      { Name: "Filius Flitwick ", Count: 9, Color: "green" },
      { Name: "Cornelius Fudge", Count: 6, Color: "blue" },
      { Name: "Gellert Grindelwald ", Count: 8, Color: "red" },
      { Name: "Godric Gryffindor ", Count: 8, Color: "green" },
      { Name: "Rubeus Hagrid ", Count: 6, Color: "red" },
      { Name: "Rolanda Hooch ", Count: 5, Color: "green" },
      { Name: "Helga Hufflepuff", Count: 4, Color: "blue" },
      { Name: "Hermione Granger", Count: 8, Color: "red" },
      { Name: "Igor Karkaroff ", Count: 6, Color: "green" },
      { Name: "Viktor Krum", Count: 6, Color: "blue" },
      { Name: "Silvanus Kettleburn ", Count: 8, Color: "blue" },
      { Name: "Bellatrix Lestrange", Count: 8, Color: "blue" },
      { Name: "Neville Longbottom", Count: 10, Color: "blue" },
      { Name: "Xenophilius Lovegood ", Count: 5, Color: "blue" },
      { Name: "Remus Lupin", Count: 8, Color: "blue" },
      { Name: "Draco Malfoy", Count: 10, Color: "blue" },
      { Name: "Ernie Macmillan", Count: 9, Color: "blue" },
      { Name: "Minerva McGonagall", Count: 6, Color: "blue" },
      { Name: "Cormac McLaggen", Count: 6, Color: "blue" },
      { Name: "Graham Montague", Count: 10, Color: "blue" },
      { Name: "Theodore Nott", Count: 10, Color: "blue" },
      { Name: "Garrick Ollivander ", Count: 7, Color: "blue" },
      { Name: "Pansy Parkinson", Count: 8, Color: "blue" },
      { Name: "Peter Pettigrew ", Count: 10, Color: "blue" },
      { Name: "Antioch Peverell", Count: 6, Color: "blue" },
      { Name: "Irma Pince", Count: 8, Color: "blue" },
      { Name: "Sturgis Podmore ", Count: 10, Color: "blue" },
      { Name: "Poppy Pomfrey ", Count: 7, Color: "blue" },
      { Name: "Harry Potter ", Count: 8, Color: "blue" }
    ]}
    this.setState({
      data: datastuff,
    });
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
          var objects = [];
          for (var i = 0; i < data.feed.entry.length; i++) {
            objects[i] = {"Name": data.feed.entry[i].gsx$whatisyourfirstandlastname.$t, "Count": parseInt(data.feed.entry[i][this2.state.skill].$t), "Color": data.feed.entry[i].gsx$color.$t };
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
        <div>
          <Graph
            width={this.state.width}
            height={this.state.height}
            data={data}
          />
          <button id="add-btn" onClick={this.handleAddClick}>Add Element</button>
        </div>
    )
    }
    else {return null}
  }
}

export default App;
