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
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Paper, Grid } from '@material-ui/core';
import education from 'assets/img/education.jpg';
import health from 'assets/img/health.jpg';
import automobile from 'assets/img/automobile.jpg';
import garments from 'assets/img/garments.jpg';
import background from 'assets/img/ptn.png';
import rest1 from 'assets/img/rest1.jpg';
import ad1 from 'assets/img/ad1.gif';
import ad2 from 'assets/img/ad2.gif';
import ad3 from 'assets/img/ad3.jpg';
import ad4 from 'assets/img/ad4.jpg';
import ad5 from 'assets/img/ad5.jpg';
import ad6 from 'assets/img/ad6.jpg';
import ad7 from 'assets/img/ad7.jpg';
import ad8 from 'assets/img/ad8.jpg';
import ad9 from 'assets/img/ad9.jpg';
import ad10 from 'assets/img/ad10.jpg';
import ad11 from 'assets/img/ad11.jpg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {
  CalendarToday,
  LocationOn,
  Timelapse,
  Call,
  Email,
  OpenInNew,
} from '@material-ui/icons';
import { IMAGE_BASE } from 'containers/App/constants';
import noImage from 'assets/img/logo.png';
import aries from 'assets/img/aries.png';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { loadFourorgRequest } from './actions';
import { makeSelectFourorg } from './selectors';
import { makeSelectCategories } from './SearchComponent/selectors';
import reducer from './reducer';
import saga from './saga';
import SearchComponent from './SearchComponent';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const dayMapper = {
  sunday: 'sun',
  monday: 'mon',
  tuesday: 'tue',
  wednesday: 'wed',
  thursday: 'thur',
  friday: 'fri',
  saturday: 'sat',
};

const Masthead = styled.div`
  background: #333 url(${background}) no-repeat center center;
  height: 350px;
  padding-top: 20px;
  color: #fff;
  margin-bottom: 50px;
  background-size: cover;
`;

const CategoryItem = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  text-align: center;
  position: relative;


  .info {
    position: absolute;
    width: 100%;
    bottom: 10px;
    color: #fff;
  }
  h5 {
    margin-bottom: 0px;
  }
  .img {
    position: relative;
    transform: scale(1);
    transition: all 0.2s ease-in-out;
    height:150px;
  }
  img {
    max-width: 100%;
  }
  .img:before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    left:0; right:0; top:0; bottom:0;
    background-image: linear-gradient(
      -180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.69) 100%
    );
  }

  &:hover {
    cursor: pointer;
  }
  &:hover .img {
    transform: scale(1.1);makeSelectFourorg
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.Component {
  state = {
    value: 0,
  };

  componentDidMount() {
    this.props.loadFourorg();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleSearch = () => {
    this.props.history.push('/search-results');
  };
  render() {
    const { value } = this.state;
    const { categories, fourorg } = this.props;
    const categoriesObj = categories.toJS();
    const fourorgObj = fourorg.toJS();
    console.log(fourorgObj);
    return (
      <React.Fragment>
        <Masthead>
          <SearchComponent search={this.handleSearch} />
        </Masthead>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-lg-10">
              <h2>Categories</h2>
              <br />
              <Grid container spacing={8}>
                {Object.keys(categoriesObj).map(each => {
                  const { CategoryImage, CategoryName } = categoriesObj[each];
                  const categoryImage =
                    (CategoryImage &&
                      CategoryImage.path &&
                      `${IMAGE_BASE}${CategoryImage.path}`) ||
                    noImage;

                  return (
                    <Grid key={`category-homepage-${each}`} item xs={6} md={3}>
                      <Link to={`/category/${each}`}>
                        <CategoryItem>
                          <div className="img">
                            <img src={categoryImage} />
                          </div>
                          <div className="info">
                            <h5>{CategoryName}</h5>
                          </div>
                        </CategoryItem>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
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
                      A maggot wound is easily identifiable - A hole of any
                      sort, a characteristic smell. You can actually see the
                      maggots moving in the wound. But do not worry the
                      treatment is simple. The vet cleans the area with
                      antiseptic. They then applies Lorex­ene, or Maggocide,
                      ointments specifically meant to kill maggots.
                    </div>
                  </div>{' '}
                </TabContainer>
              )}
              {value === 2 && (
                <TabContainer>
                  <div className="row">
                    <div className="col-4">
                      <div className="card box-card">
                        <img src={aries} height="60" width="60" />
                        <div className="card__header">
                          मेष - चु, चे, चो, ला, लि, लु, ले, लो, अ (Aries)
                        </div>
                        <div className="card__body">
                          <div className="info">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Proin nibh augue conseqaut nibbhi ellit ipsum
                            consectetur.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabContainer>
              )}

              <div className="container">
                <br />
                <h2 className="text-center">Some of Organizations</h2>
                <br />
                <br />
                <div className="row">
                  {fourorgObj.map(each => {
                    const orgImage =
                      (each.ProfileImage1 &&
                        each.ProfileImage1.path &&
                        `${IMAGE_BASE}${each.ProfileImage1.path}`) ||
                      noImage;
                    return (
                      <div
                        className="col-xs-12 col-lg-6"
                        key={`homepage-org-${each._id}`}
                      >
                        <div className="card card-item">
                          <div className="row">
                            <div className="col-5">
                              <Link to={`/organization/${each.slug}`}>
                                <img src={orgImage} />
                              </Link>
                            </div>
                            <div className="col-7">
                              <br />
                              <h5>{each.Organization}</h5>
                              <LocationOn />
                              <small>
                                {each.State} {each.District}{' '}
                                {each.VDCMunicipality}
                              </small>
                              <br />
                              <CalendarToday />
                              <small>
                                {each.OpenningDays.map(
                                  day => dayMapper[day],
                                ).join(', ')}
                              </small>
                              <br />
                              <Timelapse />
                              <small>{each.OpenningTime}</small> <br />
                            </div>
                            <div className="row">
                              <div className="col-4">
                                <a href={`tel:${each.PhoneNo}`}>
                                  <Call />Call
                                </a>
                              </div>
                              <div className="col-4">
                                <a href={`mailto:${each.OrganizationEmail}`}>
                                  <Email />Email
                                </a>{' '}
                              </div>
                              <div className="col-4">
                                {' '}
                                <a href={each.Website} target="_blank">
                                  <OpenInNew />Visit Site
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-lg-2 ad-section">
              <img src={ad1} />
              <img src={ad3} />
              <img src={ad4} />
              <img src={ad5} />
              <img src={ad6} />
              <img src={ad2} />
              <img src={ad7} />
              <img src={ad8} />
              <img src={ad9} />
              <img src={ad10} />
              <img src={ad11} />
            </div>
          </div>
        </div>

        <div className="cta-block">
          <div className="container">
            <h2>Want to list here?</h2>
            <p>We can help you to promote your organization online</p>
            <Button variant="contained" color="primary" size="large">
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
                {/* <Call /> 977-9849242008<br />
                <Email /> info@email.com<br /> */}
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
                {/* <Call /> 977-9849242008<br />
                <Email /> info@email.com<br /> */}
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
                {/* <Call /> 977-9849242008<br />
                <Email /> info@email.com<br /> */}
                <br />
                <Button size="small" variant="outlined">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
  fourorg: makeSelectFourorg(),
});

const mapDispatchToProps = dispatch => ({
  loadFourorg: () => dispatch(loadFourorgRequest()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
