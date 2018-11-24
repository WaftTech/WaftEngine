import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import HomePage from './pages/HomePage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Route path="/" exact component={HomePage} />
          <Route path="/about/" component={HomePage} />
          <Route path="/users/" component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
