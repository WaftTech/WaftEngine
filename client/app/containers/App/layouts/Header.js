import React from 'react';
import Link from 'react-router-dom/Link';
import logo from 'assets/img/logo.png';
import ad from 'assets/img/ad.jpg';

const Header = () => (
  <React.Fragment>
    <header className="header header-main">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-lg-6">
            <div className="logo">
              <Link to="/">
                <img src={logo} />
              </Link>
            </div>
          </div>
          <div className="col-xs-12 col-lg-6">
            <img src={ad} />
          </div>
        </div>
      </div>
    </header>
  </React.Fragment>
);

export default Header;
