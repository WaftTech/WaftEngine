import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import logo from 'assets/img/logo.svg';
// import {Helmet} from "react-helmet";
import { Button, Grid, FormControl, InputBase } from '@material-ui/core';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header className="header header-main">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-lg-6">
              <div className="logo">
                <Grid container spacing={24}>
                  <Grid item xs={12} lg={4}>
                    {' '}
                    <Link to="/">
                      <img src={logo} />
                    </Link>
                    <span className="tagline">PRODUCT OF WAFTTECH</span>
                  </Grid>
                  {/* <Grid item xs={12} lg={6}>
                 <FormControl
                  style={{
                    background: "#fff",
                    width: "100%",
                    fontSize: "12px",
                    padding: "5px 15px"
                  }}
                >
                  <InputBase
                    id="bootstrap-input"
                    placeholder="What product you are looking for"
                  />
                </FormControl>
              </Grid>*/}
                  <Grid item xs={12} lg={8} className="text-right hidden-mobile">
                    <Link className="plainLink" to="/company">
                      Companies
                    </Link>
                    <Link className="plainLink" to="/blog-list">
                      Blogs
                    </Link>
                    <Link className="plainLink" to="/about-us">
                      About
                    </Link>
                    <Link className="plainLink" to="/contact-us">
                      Contact
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
