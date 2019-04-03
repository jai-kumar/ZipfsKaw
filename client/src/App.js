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
      responseToPost: ''
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
        {/*Nav Bar - Start*/}
        <nav className="navbar navbar-inverse navBarMargin">
          <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>                        
                </button>
                <a className="navbar-brand">Zipf's Law</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav">
                  <li className="home active">Home</li>
                  <li className="about">About</li>
                </ul>
            </div>
          </div>
        </nav>
        {/*Nav Bar - End*/}

        {/*App Body - Start*/}
          <div className="row">
            <div className="col col-md-offset-4 col-md-4 col-sm-12 col-xs-12">
            <form onSubmit={this.handleSubmit} classsName="form-inline col offset-md-4 col-md-4 col-sm-12 col-xs-12">
              <div className="form-group">
                <input type="email" className="form-control" onChange={e => this.setState({ post: e.target.value })} value={this.state.post} />
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
              </div>
            </form>
            {/*<p className="data">{this.state.responseToPost}</p>*/}
            </div>
          </div>

          <div className="chartWrapper">
            {this.state.showComponent ?
              <Barchart chartdata={this.state.responseToPost} width={this.state.width} height={this.state.height} /> : null
            }
          </div>
        {/*App Body - End*/}
      </div>
    );
  }
}

export default App;
