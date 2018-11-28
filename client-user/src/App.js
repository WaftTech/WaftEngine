import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import NavLeft from "./components/Nav";
import HomePage from "./pages/HomePage";
import TripDetailPage from "./pages/TripDetailPage";
import GuestDetailPage from "./pages/GuestDetailPage";
import UpcomingTrips from "./pages/UpcomingTrips";
import PastTrips from "./pages/PastTrips";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <div className="row">
              <NavLeft />
              <Route path="/" exact component={HomePage} />
              <Route path="/trip-detail" exact component={TripDetailPage} />
              <Route path="/guest-detail" exact component={GuestDetailPage} />
              <Route path="/upcoming-trips" exact component={UpcomingTrips} />
              <Route path="/past-trips" exact component={PastTrips} />
              <Route path="/about/" component={HomePage} />
              <Route path="/users/" component={HomePage} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
