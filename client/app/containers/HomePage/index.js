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
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, TextField, Paper, Grid } from '@material-ui/core';
import logo from 'assets/img/logo.png';
import ad from 'assets/img/ad.jpg';
import education from 'assets/img/education.jpg';
import health from 'assets/img/health.jpg';
import automobile from 'assets/img/automobile.jpg';
import garments from 'assets/img/garments.jpg';
import background from 'assets/img/ptn.png';
import telecome from 'assets/img/telecom.jpg';
import rest1 from 'assets/img/rest1.jpg';
import categoryIcon from 'assets/img/rest_thumb.png';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {
    CalendarToday,
    LocationOn,
    Timelapse,
    Call,
    Email,
    Wifi,
} from '@material-ui/icons';
import aries from 'assets/img/aries.png';
import SearchComponent from './SearchComponent';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

const Masthead = styled.div`
  background: #333 url(${background}) no-repeat center center;
  height: 350px;
  padding-top: 20px;
  color: #fff;
  margin-bottom: 50px;
  background-size: cover;
`;

const CategoryItem = styled.div`
  margin-bottom: 20px; margin-right:20px;
  background:#fff; border-radius:6px; overflow:hidden;
  text-align:center; position:relative;

  .info { position:absolute; width:100%; bottom:10px; color:#fff;}
  h5 { margin-bottom:0px;}
  .img { position:relative;}
  img { max-width:100%; }
.img:before { position:absolute; content:""; width:100%; height:100%;
background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.69) 100%); }
}
`;

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        return (
            <React.Fragment>
                <Masthead>
                    <SearchComponent />
                </Masthead>

                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-lg-10">
                            <h2>Categories</h2>
                            <br />
                            <Grid container spacing={16}>
                                <Grid item xs={6} lg={3}>
                                    <CategoryItem>
                                        <div className="img"><img src={education} /></div>
                                        <div className="info"><h5>Education</h5><small>2100</small></div>
                                    </CategoryItem>
                                </Grid>
                                <Grid item xs={6} lg={3}>
                                    <CategoryItem>
                                        <div className="img"><img src={automobile} /></div>
                                        <div className="info"><h5>Automobile</h5><small>2100</small></div>
                                    </CategoryItem>
                                </Grid>
                                <Grid item xs={6} lg={3}>
                                    <CategoryItem>
                                        <div className="img"><img src={health} /></div>
                                        <div className="info"><h5>Health</h5><small>2100</small></div>
                                    </CategoryItem>
                                </Grid>
                                <Grid item xs={6} lg={3}>
                                    <CategoryItem>
                                        <div className="img"><img src={garments} /></div>
                                        <div className="info"><h5>Garments</h5><small>2100</small></div>
                                    </CategoryItem>
                                </Grid >
                            </Grid>
                            <div className="container">
                                <Paper>
                                    <Tabs
                                        value={value}
                                        onChange={this.handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        centered
                                    >
                                        <Tab label="Recent Videos" />
                                        <Tab label="About Us" />
                                        <Tab label="Rashifal" />
                                    </Tabs>
                                </Paper>
                                {value === 0 && (
                                    <TabContainer>
                                        <div className="text-center">
                                            <iframe
                                                width="560"
                                                height="315"
                                                src="https://www.youtube.com/embed/a_wuykzfFzE"
                                                frameBorder="0"
                                                allowFullScreen
                                            />
                                        </div>
                                    </TabContainer>
                                )}
                                {value === 1 && (
                                    <TabContainer>
                                        <div className="text-center">
                                            <div className="maxWidth500">
                                                A maggot wound is easily identifiable - A hole of any sort,
                                                a characteristic smell. You can actually see the maggots
                                                moving in the wound. But do not worry the treatment is
                                                simple. The vet cleans the area with antiseptic. They then
                                                applies Lorex­ene, or Maggocide, ointments specifically
                                                meant to kill maggots.
                  </div>
                                        </div>{' '}
                                    </TabContainer>
                                )}
                                {value === 2 && (
                                    <TabContainer>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="card box-card is-always-shadow">
                                                    <div className="card__header">
                                                        <div className="clearfix">
                                                            <span className="designation">
                                                                मेष - चु, चे, चो, ला, लि, लु, ले, लो, अ (Aries)
                          </span>
                                                        </div>
                                                    </div>
                                                    <div className="card__body">
                                                        <div className="text item media-info">
                                                            <div className="img">
                                                                <img src={aries} height="60" width="60" />
                                                            </div>{' '}
                                                            <div className="info">
                                                                <span className="designation">
                                                                    Lorem ipsum dolor sit amet, consectetur
                                                                    adipisicing elit. Proin nibh augue conseqaut
                                                                    nibbhi ellit ipsum consectetur.
                            </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabContainer>
                                )}
                            </div>

                            <br />
                            <div className="container">
                                <h2 className="text-center">Some of Organizations</h2>
                                <div className="row">
                                    <div className="col-xs-12 col-lg-6">
                                        <div className="card">
                                            <div className="row">
                                                <div className="col-3">
                                                    <img src={rest1} />
                                                </div>
                                                <div className="col-9">
                                                    <br />
                                                    <h5>Thakali Restaurant</h5>
                                                    <CalendarToday />Opening Days:SUN, MON, TUE, WED, THU, FRI{' '}
                                                    <br />
                                                    <LocationOn /> State 3 Bhaktapur Thimi,hanumante Bridge<br />
                                                    <Timelapse /> Opening Time:10AM-7PM<br />
                                                    <Call /> 977-9849242008<br />
                                                    <Email /> info@email.com<br />
                                                    <Wifi />http://website.com
              </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-xs-12 col-lg-6">
                                        <div className="card">
                                            <div className="row">
                                                <div className="col-3">
                                                    <img src={rest1} />
                                                </div>
                                                <div className="col-9">
                                                    <br />
                                                    <h5>Thakali Restaurant</h5>
                                                    <CalendarToday />Opening Days:SUN, MON, TUE, WED, THU, FRI{' '}
                                                    <br />
                                                    <LocationOn /> State 3 Bhaktapur Thimi,hanumante Bridge<br />
                                                    <Timelapse /> Opening Time:10AM-7PM<br />
                                                    <Call /> 977-9849242008<br />
                                                    <Email /> info@email.com<br />
                                                    <Wifi />http://website.com
              </div>
                                            </div>
                                        </div>
                                    </div>




                                </div>
                            </div>
                        </div >

                        <div className="col-xs-12 col-lg-2 ad-section">
                            <img src={telecome} />
                            <img src={telecome} />
                            <img src={telecome} />
                            <img src={telecome} />
                            <img src={telecome} />
                            <img src={telecome} />
                            <img src={telecome} />
                            <img src={telecome} />
                            <img src={telecome} />
                        </div>

                    </div >
                </div >
                <div className="cta-block">
                    <div className="container">
                        <h2>Want to list here?</h2>
                        <p>We can help you to promote your organization online</p>
                        <Button variant="primary" size="large">
                            Contact Us
            </Button>
                    </div>
                </div>
                <div className="container">
                    <h3 className="text-center">Articles</h3>
                    <br />
                    <br />
                    <div className="row">
                        <div className="col-4">
                            <div className="card box-card">
                                <h5>Nepal is very developed country</h5>
                                <p>
                                    Nepal is very developed country Nepal is very developed
                                    country
                </p>
                                <Call /> 977-9849242008<br />
                                <Email /> info@email.com<br />
                                <br />
                                <Button size="small" variant="outlined">
                                    View Details
                </Button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card box-card">
                                <h5>Nepal is very developed country</h5>
                                <p>
                                    Nepal is very developed country Nepal is very developed
                                    country
                </p>
                                <Call /> 977-9849242008<br />
                                <Email /> info@email.com<br />
                                <br />
                                <Button size="small" variant="outlined">
                                    View Details
                </Button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card box-card">
                                <h5>Nepal is very developed country</h5>
                                <p>
                                    Nepal is very developed country Nepal is very developed
                                    country
                </p>
                                <Call /> 977-9849242008<br />
                                <Email /> info@email.com<br />
                                <br />
                                <Button size="small" variant="outlined">
                                    View Details
                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}
