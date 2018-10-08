/**
 *
 * OauthConnect
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import Link from 'react-router-dom/Link';
import logo from 'assets/img/logo.svg';

/* eslint-disable react/prefer-stateless-function */
class OauthConnect extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="">
        <header>
          <div className="container">
            <img src={logo} />
          </div>
        </header>
        <div className="container">
          <div className="box-center">
            <h1> Just a door back </h1>
            <p>simply login with social accounts or sign up in easy steps.</p>
            {/* <p>
              <Link to="/login">Sign in</Link>/<Link to="/register">Sign up</Link>{' '}
              with social login
        </p> */}
            <Button> google</Button>
            <Button> github</Button>
            <br />
            <br />
            <div>-or-</div>
            <br />
            {children}
          </div>
        </div>
      </div>
    );
  }
}

OauthConnect.propTypes = {};

export default OauthConnect;
