import React from 'react';
// import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <a className="" href="/">
            <img src="/logo.svg" alt="logo" />
          </a>
        </div>
        <div className="col-md-6">
          <div className="input-group input-group-sm input-search">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <ion-icon
                  name="search"
                  role="img"
                  class="color-white hydrated"
                  aria-label="search"
                />
              </span>
            </div>
            <input type="text" className="form-control" placeholder="Search Trips" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="float-right">
            <a className="nav-link " href="/">
              <img className="maxWidth20" src="/profilepic.png" alt="profile" />
              <ion-icon name="arrow-dropdown" role="img" class="hydrated" aria-label="search" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
