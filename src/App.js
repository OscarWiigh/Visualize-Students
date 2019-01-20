import React, { Component } from 'react';
import Graph from "./components/Graph"
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
        data: [],
        width: 960,
        height: 600,
      }
  }

  componentDidMount() {
    const preFix = "https://spreadsheets.google.com/feeds/list/";
    const sheetID = "1qG2ZwU-Zg7GzvFW_qUi5gclqPDB5OVqEZ1pM-Jmxil8";
    const postFix = "/1/public/values?alt=json"

    const spreadheetUrl = preFix + sheetID + postFix;
    fetch(spreadheetUrl)
      .then(result=>result.json())
      .then(data=>this.setState({items: data.feed.entry}))
  }

  render() {
      return (
        <div>
          <Graph
            width={this.state.width}
            height={this.state.height}
            data={this.state.items}
          />
        </div>
    )
  }
}

export default App;
