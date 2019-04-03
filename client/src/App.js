import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Link } from 'react-router-dom';

import Barchart from './Components/BarChartPage/barchart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      response: '',
      post: '',
      responseToPost: '',//[{"word": "UI", "frequency": "150"}],
      data: [{"name": "english", "marks": 5},{"name": "maths", "marks": 8}],//12, 5, 6, 6, 9, 10
      width: 700,
      height: 500,
      id: 'root'
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    this.setState({
      showComponent: true,
    });
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/initialtest');
    const body = await response.json();
    
    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/searchword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
    this.setState({
      showComponent: true,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })}
            />
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
          </form>
          <p className="data">{this.state.responseToPost}</p>
        </header>
        {/*<Router>
          <Route exact path='/barChart' component={Barchart} render={(state.data) => <Barchart data={this.state.data} />} />
        </Router>*/}
        {/*<Barchart data={this.state.data} width={this.state.width} height={this.state.height} />*/}
        {this.state.showComponent ?
           <Barchart cdata={this.state.responseToPost} width={this.state.width} height={this.state.height} /> :
           null
        }
      </div>
    );
  }
}

export default App;
