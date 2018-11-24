import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.svg';
import profilepic from '../img/profilepic.png';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link to="/" className="">
                <img alt="pics" src={Logo} />
              </Link>
            </div>
            <div className="col-md-6">
              <div className="input-group input-group-sm input-search">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <ion-icon className="color-white" name="search" />
                  </span>
                </div>
                <input type="text" className="form-control" placeholder="Search Trips" />
              </div>
            </div>
            <div className="col-md-3">
              <div className="float-right">
                <Link to="/" className="nav-link">
                  <img alt="pics" className="maxWidth20" src={profilepic} />
                  <ion-icon name="arrow-dropdown" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
