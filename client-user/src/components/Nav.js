import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo.svg";
import profilepic from "../img/profilepic.png";

export default class NavLeft extends Component {
  render() {
    return (
      <div className="col-md-3">
        <div className="media pt-4 mb-4">
          <img alt="pics" className="maxWidth40" src={profilepic} />
          <div className="media-body pt-2 pl-2">Celina Jose</div>
        </div>

        <ul className="navList">
          <li>
            <Link className="active" to="/">
              Trip Feed
            </Link>
          </li>
          <li>
            <Link to="/upcoming-trips">Upcoming Trips</Link>
          </li>
          <li>
            <Link to="/past-trips">Past Trips</Link>
          </li>
        </ul>
        <ul className="nav nav-horz">
          <li>About us </li>
          <li> | </li>
          <li>Terms of Use</li>
        </ul>
      </div>
    );
  }
}
