/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon, Button, TextField, Tabs, Tab } from '@material-ui/core';
import logo from 'assets/img/logo.png';
import background from 'assets/img/background.jpg';
import rest1 from 'assets/img/rest1.jpg';
import categoryIcon from 'assets/img/rest_thumb.png';

const Masthead = styled.div`
  background: #333 url(${background}) no-repeat center center;
  height: 350px;
  padding-top: 20px;
  color: #fff;
  margin-bottom:50px;
`;


const CategoryItem = styled.div`
box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
padding: 30px 50px;
`;






/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
    render() {
        return (
            <section className="el-container is-vertical">
                <header className="el-header header-main">
                    <div className="container">
                        <div className="logo">
                            <Link to="/">
                                <img src={logo} />
                            </Link>
                        </div>
                    </div>
                </header>

                <Masthead>
                    <div className="text-center">
                        <br />
                        <br />
                        <h2>Ask To Marina</h2>
                        <strong className="content-title">
                            BE A PART OF THE LOCAL SEARCH REVOLUTION
            </strong>
                        <br />
                        <div className="search-container">
                            <div className="row">
                                <TextField className="col-4"
                                    id="standard-select-category"
                                    select
                                    label="Select"
                                />

                                <TextField className="col-6" fullWidth label="Please Input" />
                                <Button size="small" className="col-2" variant="contained" color="primary">
                                    Search
                            </Button>
                            </div>
                            <div className="clearfix" />
                        </div>
                    </div>
                </Masthead>

                <div className="container">

                    <CategoryItem>
                        <h2>Categories</h2>
                        <div className="media-info">
                            <div className="img">
                                <img src={categoryIcon} /></div>
                            <div className="info">
                                <strong><a href="#">Restaurant</a> </strong>
                                <span className="designation">4606</span></div></div>

                    </CategoryItem>

                    <br />
                    <br />
                    <br />
                    <Tabs
                    >
                        <Tab
                            disableRipple
                            label="Video"
                        />
                        <Tab
                            disableRipple
                            label="About Us"
                        />
                        <Tab
                            disableRipple
                            label="Rashifal"
                        />
                    </Tabs>

                    <br />
                    <br />
                    <h2>Some of Organizations</h2>
                    <div className="card">
                        <img src={rest1} />
                        <h3>Thakali Restaurant</h3>
                        Opening Days:SUN, MON, TUE, WED, THU, FRI
          <Icon>Star</Icon> 1234456
          <Icon>Star</Icon> State 3 Bhaktapur Thimi,hanumante Bridge
          <Icon>Star</Icon> Pincode: 123
          <Icon>Star</Icon> Opening Time:10AM-7PM
          <Icon>Star</Icon> 99999999999
          <Icon>Star</Icon> info@email.com
          <Icon>Star</Icon> website.com
        </div>


                    <div className="cta-block">
                        <div className="container">
                            <h2>Require something special?</h2>
                            <p>We might help you to build it better way!</p>
                            <Button variant="secondary" size="large">
                                <span>Send us some words</span></Button></div></div>




                </div>

            </section>
        );
    }
}
