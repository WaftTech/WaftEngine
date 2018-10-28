import React from 'react';
import Link from 'react-router-dom/Link';
import logo from 'assets/img/logo.png';
import ad from 'assets/img/ad.jpg';

const Header = () => (
  <header className="header header-main">
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-lg-6">
          <div className="logo">
            <Link to="/">
              <img src={logo} />
            </Link>
            <Link style={{ marginLeft: '20px' }} to="/login">Login</Link>
          </div>
        </div>
        <div className="col-xs-12 col-lg-6">
          <img className="ad-top-right" src={ad} />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
